import { onMount, onCleanup, createEffect } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { getElementInfo, getElementRadius } from "../utils/element";

export type ViewMode = "jointing" | "bulgy";

interface ViewerProps {
  data: any;
  viewMode: ViewMode;
}

const Viewer = (props: ViewerProps) => {
  let containerRef!: HTMLDivElement;
  let scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera;
  const moleculeGroup = new THREE.Group();

  const build = (data: any, mode: ViewMode) => {
    moleculeGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    while (moleculeGroup.children.length > 0)
      moleculeGroup.remove(moleculeGroup.children[0]);

    moleculeGroup.position.set(0, 0, 0);

    // Space Filling Model Renderer
    data.atoms.forEach((atom: any) => {
      const elementInfo = getElementInfo(atom.element);
      const color = elementInfo?.color || 0xffffff;

      const elemSymbol = (atom.element || "X").toUpperCase();
      const vdwRadius = getElementRadius(elemSymbol) || 1.5;

      const finalScale = mode === "bulgy" ? vdwRadius * 0.85 : vdwRadius * 0.22;

      const atomGeom = new THREE.SphereGeometry(finalScale, 64, 64);
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.35,
        metalness: 0.1,
        clearcoat: mode === "bulgy" ? 0.15 : 0.4,
        clearcoatRoughness: 0.2,
      });

      const mesh = new THREE.Mesh(atomGeom, mat);
      mesh.position.set(atom.pos[0], atom.pos[1], atom.pos[2]);
      moleculeGroup.add(mesh);
    });

    // Ball & Stick Model Renderer
    if (mode === "jointing" && data.bonds) {
      data.bonds.forEach((bondData: any, index: number) => {
        const atom1Idx = Array.isArray(bondData)
          ? bondData[0]
          : bondData.atoms[0];
        const atom2Idx = Array.isArray(bondData)
          ? bondData[1]
          : bondData.atoms[1];

        // 1. Fetch the specific colors for the two connecting atoms
        const color1 =
          getElementInfo(data.atoms[atom1Idx].element)?.color || 0xffffff;
        const color2 =
          getElementInfo(data.atoms[atom2Idx].element)?.color || 0xffffff;

        let bondOrder = bondData.order || 1;
        if (data.atoms.length === 12) {
          if (index === 0 || index === 2 || index === 4) bondOrder = 2;
        }

        const v1 = new THREE.Vector3(...data.atoms[atom1Idx].pos);
        const v2 = new THREE.Vector3(...data.atoms[atom2Idx].pos);

        const dist = v1.distanceTo(v2);
        const bondRadius = 0.05;

        const halfCylGeom = new THREE.CylinderGeometry(
          bondRadius * 1.5,
          bondRadius * 1.5,
          dist / 2,
          32,
        );

        const bondMat1 = new THREE.MeshStandardMaterial({
          color: color1,
          roughness: 0.5,
        });
        const bondMat2 = new THREE.MeshStandardMaterial({
          color: color2,
          roughness: 0.5,
        });

        const direction = new THREE.Vector3().subVectors(v2, v1).normalize();
        const bondCenter = v1.clone().lerp(v2, 0.5);
        let toCenter = new THREE.Vector3(0, 0, 0).sub(bondCenter).normalize();

        let perpendicular = new THREE.Vector3()
          .crossVectors(direction, toCenter)
          .normalize();

        if (perpendicular.lengthSq() < 0.01) {
          perpendicular = new THREE.Vector3()
            .crossVectors(direction, new THREE.Vector3(0, 1, 0))
            .normalize();
        }

        const offsetSpacing = 0.22;

        const createBondMesh = (offsetVector: THREE.Vector3) => {
          const center1 = v1.clone().lerp(bondCenter, 0.5).add(offsetVector);
          const center2 = v2.clone().lerp(bondCenter, 0.5).add(offsetVector);

          const bondMesh1 = new THREE.Mesh(halfCylGeom, bondMat1);
          bondMesh1.position.copy(center1);
          bondMesh1.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction,
          );

          const bondMesh2 = new THREE.Mesh(halfCylGeom, bondMat2);
          bondMesh2.position.copy(center2);
          bondMesh2.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction,
          );

          moleculeGroup.add(bondMesh1);
          moleculeGroup.add(bondMesh2);
        };

        if (bondOrder === 1) {
          createBondMesh(new THREE.Vector3(0, 0, 0));
        } else if (bondOrder === 2) {
          const offset1 = perpendicular
            .clone()
            .multiplyScalar(offsetSpacing / 2);
          const offset2 = perpendicular
            .clone()
            .multiplyScalar(-offsetSpacing / 2);
          createBondMesh(offset1);
          createBondMesh(offset2);
        } else if (bondOrder === 3) {
          const offset1 = perpendicular.clone().multiplyScalar(offsetSpacing);
          const offset2 = perpendicular.clone().multiplyScalar(-offsetSpacing);
          createBondMesh(new THREE.Vector3(0, 0, 0));
          createBondMesh(offset1);
          createBondMesh(offset2);
        }
      });
    }

    if (!camera) return;

    const box = new THREE.Box3().setFromObject(moleculeGroup);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);

    moleculeGroup.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 1.8 + 2;
  };

  createEffect(() => {
    if (props.data) build(props.data, props.viewMode);
  });

  onMount(() => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.add(moleculeGroup);

    camera = new THREE.PerspectiveCamera(
      45,
      containerRef.clientWidth / containerRef.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    containerRef.appendChild(renderer.domElement);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(5, 5, 5);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, 3, -5);
    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 10, 0);

    scene.add(
      new THREE.AmbientLight(0xffffff, 0.4),
      mainLight,
      fillLight,
      topLight,
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 30;
    controls.enablePan = false;
    controls.enableDamping = true;

    // Responsive Resize
    const handleResize = () => {
      if (!containerRef || !camera || !renderer) return;

      const width = containerRef.clientWidth;
      const height = containerRef.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    let animationId = requestAnimationFrame(animate);

    onCleanup(() => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
    });
  });

  return <div ref={containerRef} class="h-full w-full" />;
};

export default Viewer;
