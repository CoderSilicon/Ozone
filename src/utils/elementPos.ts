import { ELEMENT_DATA } from "./element";

export async function fetchMoleculeData(query: string) {
  try {
    // 1. Get CID from Name
    const nameRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/cids/JSON`,
    );

    // Check if the molecule name exists in PubChem's registry
    if (!nameRes.ok) {
      throw new Error(`Molecule "${query}" not found in PubChem registry.`);
    }

    const nameData = await nameRes.json();

    if (!nameData?.IdentifierList?.CID?.[0]) {
      throw new Error(
        `Could not resolve a valid CID identifier for "${query}".`,
      );
    }
    const cid = nameData.IdentifierList.CID[0];

    // 2. Get 3D Coordinates for that CID
    const coordRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/JSON?record_type=3d`,
    );

    // Check if PubChem has a valid 3D conformation mesh for this specific CID
    if (!coordRes.ok) {
      throw new Error(
        `Structural compilation failed. No 3D coordinate maps available for CID ${cid}.`,
      );
    }

    const coordData = await coordRes.json();

    // 3. Parse PubChem JSON into your format
    const record = coordData?.PC_Compounds?.[0];
    if (!record || !record.atoms || !record.coords) {
      throw new Error(
        "Target registry payload is corrupt or missing atomic maps.",
      );
    }

    const coords = record.coords[0].conformers[0];
    const aids = record.atoms.aid; // Atom IDs
    const elements = record.atoms.element; // Atomic numbers (e.g., 6 for Carbon)

    // Map atomic numbers back to symbols dynamically using your ELEMENT_DATA mapping array
    const atomicMap: Record<number, string> = Object.entries(
      ELEMENT_DATA,
    ).reduce(
      (acc, [symbol], index) => {
        acc[index + 1] = symbol;
        return acc;
      },
      {} as Record<number, string>,
    );

    const atoms = aids.map((id: number, i: number) => ({
      element: atomicMap[elements[i]] || "C", // Default fallback to Carbon
      pos: [coords.x[i], coords.y[i], coords.z[i]],
    }));

    // 4. Map Bonds and keep the true bond order intact (No single-bond flattening!)
    const bonds =
      record.bonds && record.bonds.aid1
        ? record.bonds.aid1.map((id1: number, i: number) => ({
            atoms: [id1 - 1, record.bonds.aid2[i] - 1],
            order: record.bonds.order ? record.bonds.order[i] : 1, // Extract 1, 2, or 3 cleanly
          }))
        : [];

    return { atoms, bonds };
  } catch (e: any) {
    console.error("Chemical Pipeline Execution Stopped:", e.message);
    // CRITICAL: Throwing the error instead of returning null forces
    // Solid's createResource to populate moleculeData.error immediately!
    throw e.message || "An unexpected network sequence failure occurred.";
  }
}
