export interface SnapshotRow {
  label: string;
  value: number;
}

export const snapshots: SnapshotRow[][] = [
  [
    { label: "North", value: 20 },
    { label: "South", value: 14 },
    { label: "East", value: 12 },
    { label: "West", value: 9 }
  ],
  [
    { label: "North", value: 28 },
    { label: "South", value: 21 },
    { label: "East", value: 19 },
    { label: "West", value: 15 }
  ],
  [
    { label: "North", value: 36 },
    { label: "East", value: 30 },
    { label: "South", value: 27 },
    { label: "West", value: 17 }
  ]
];