export interface NodeDatum {
  id: string;
  group: number;
}

export interface LinkDatum {
  source: string;
  target: string;
  weight: number;
}

export const nodes: NodeDatum[] = [
  { id: "Atlas", group: 1 },
  { id: "Beacon", group: 1 },
  { id: "Cipher", group: 2 },
  { id: "Delta", group: 2 },
  { id: "Echo", group: 3 },
  { id: "Flux", group: 3 }
];

export const links: LinkDatum[] = [
  { source: "Atlas", target: "Beacon", weight: 2 },
  { source: "Atlas", target: "Cipher", weight: 1 },
  { source: "Beacon", target: "Delta", weight: 2 },
  { source: "Cipher", target: "Echo", weight: 3 },
  { source: "Delta", target: "Echo", weight: 1 },
  { source: "Echo", target: "Flux", weight: 2 }
];