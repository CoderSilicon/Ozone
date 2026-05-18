import { ELEMENT_DATA } from "./element";

export async function fetchMoleculeData(query: string) {
  try {
    // Get CID 
    const nameRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/cids/JSON`,
    );

    // Check if the molecule name exists
    if (!nameRes.ok) {
      throw new Error(`Molecule "${query}" not found in registry.`);
    }

    const nameData = await nameRes.json();

    if (!nameData?.IdentifierList?.CID?.[0]) {
      throw new Error(
        `Could not resolve for "${query}".`,
      );
    }
    const cid = nameData.IdentifierList.CID[0];

    // 2. Get 3D Coordinates for that CID
    const coordRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/JSON?record_type=3d`,
    );

    // Checking if PubChem has 3D
    if (!coordRes.ok) {
      throw new Error(
        `Compilation failed. No 3D maps available for CID ${cid}.`,
      );
    }

    const coordData = await coordRes.json();

    // Parse JSON into your format
    const record = coordData?.PC_Compounds?.[0];
    if (!record || !record.atoms || !record.coords) {
      throw new Error(
        "Registry payload is corrupt or missing atomic maps.",
      );
    }

    const coords = record.coords[0].conformers[0];
    const aids = record.atoms.aid; // Atom ids
    const elements = record.atoms.element; // Atomic numbers 


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
      element: atomicMap[elements[i]] || "C", 
      pos: [coords.x[i], coords.y[i], coords.z[i]],
    }));

    const bonds =
      record.bonds && record.bonds.aid1
        ? record.bonds.aid1.map((id1: number, i: number) => ({
            atoms: [id1 - 1, record.bonds.aid2[i] - 1],
            order: record.bonds.order ? record.bonds.order[i] : 1,
          }))
        : [];

    return { atoms, bonds };
  } catch (e: any) {
    console.error("Search Execution Stopped:", e.message);
    throw e.message || "An unexpected error occurred.";
  }
}
