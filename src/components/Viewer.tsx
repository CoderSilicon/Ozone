import { onMount, onCleanup, createEffect } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js"; 
import { getElementInfo } from "../utils/element";

export type ViewMode = "jointing" | "bulgy";

interface ViewerProps {
  data: any;
  viewMode: ViewMode;
}

const Viewer = (props: ViewerProps) => {
  let containerRef!: HTMLDivElement;
  let scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera;
  const moleculeGroup = new THREE.Group();

  const build = (data: any, mode: ViewMode) => {
    // 1. STEROID CLEANUP: Dispose of old geometry to prevent GPU lag
    moleculeGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    while (moleculeGroup.children.length > 0) moleculeGroup.remove(moleculeGroup.children[0]);
    
    // Reset group position before rebuilding
    moleculeGroup.position.set(0, 0, 0);

    const atomScale = mode === "bulgy" ? 1.2 : 0.35;
    const atomGeom = new THREE.SphereGeometry(atomScale, 32, 32); // 32 is enough for performance
    
    data.atoms.forEach((atom: any) => {
      const color = getElementInfo(atom.element)?.color || 0xffffff;
      const mat = new THREE.MeshPhysicalMaterial({ 
        color, 
        roughness: 0.2, 
        clearcoat: mode === "bulgy" ? 0.5 : 1.0 
      });
      const mesh = new THREE.Mesh(atomGeom, mat);
      
      // Map API coordinates directly
      mesh.position.set(atom.pos[0], atom.pos[1], atom.pos[2]);
      moleculeGroup.add(mesh);
    });

    if (mode === "jointing" && data.bonds) {
      data.bonds.forEach((pair: number[]) => {
        const v1 = new THREE.Vector3(...data.atoms[pair[0]].pos);
        const v2 = new THREE.Vector3(...data.atoms[pair[1]].pos);
        const dist = v1.distanceTo(v2);
        const cyl = new THREE.CylinderGeometry(0.08, 0.08, dist, 16);
        const bond = new THREE.Mesh(cyl, new THREE.MeshStandardMaterial({ color: 0x333333 }));
        
        bond.position.copy(v1.clone().lerp(v2, 0.5));
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v2.clone().sub(v1).normalize());
        moleculeGroup.add(bond);
      });
    }

    // 2. AUTO-CENTERING & ZOOM: This makes "any" molecule fit perfectly
    const box = new THREE.Box3().setFromObject(moleculeGroup);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    
    box.getCenter(center);
    box.getSize(size);
    
    // Offset the group so the molecule's center is at [0,0,0]
    moleculeGroup.position.sub(center);

    // Adjust camera distance based on molecule size
    const maxDim = Math.max(size.x, size.y, size.z);
    if (camera) {
        camera.position.z = maxDim * 1.8 + 2; 
    }
  };

  createEffect(() => {
    if (props.data) build(props.data, props.viewMode);
  });

  onMount(() => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.add(moleculeGroup);

    camera = new THREE.PerspectiveCamera(45, containerRef.clientWidth / containerRef.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    containerRef.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6), light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

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

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default Viewer;