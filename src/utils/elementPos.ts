import { ELEMENT_DATA } from "./element";

// utils/chemApi.ts
export async function fetchMoleculeData(query: string) {
  try {
    // 1. Get CID from Name
    const nameRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/cids/JSON`,
    );
    const nameData = await nameRes.json();
    const cid = nameData.IdentifierList.CID[0];

    // 2. Get 3D Coordinates for that CID
    const coordRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/JSON?record_type=3d`,
    );
    const coordData = await coordRes.json();

    // 3. Parse PubChem JSON into your format
    const record = coordData.PC_Compounds[0];
    const coords = record.coords[0].conformers[0];
    const aids = record.atoms.aid; // Atom IDs
    const elements = record.atoms.element; // Atomic numbers (e.g., 6 for Carbon)

    // Map atomic numbers back to symbols (simplified mapping)
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
      element: atomicMap[elements[i]] || "C", // Default to Carbon
      pos: [coords.x[i], coords.y[i], coords.z[i]],
    }));

    // Extract bonds
    const bonds = record.bonds
      ? record.bonds.aid1.map((id1: number, i: number) => [
          id1 - 1,
          record.bonds.aid2[i] - 1,
        ])
      : [];

    return { atoms, bonds };
  } catch (e) {
    console.error("Molecule not found in PubChem", e);
    return null;
  }
}
