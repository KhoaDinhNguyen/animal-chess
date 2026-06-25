export const PIECE_INFO: Record<number, { movement: string; special: string }> = {
  1: { movement: "1 square orthogonally; can enter and swim rivers", special: "Captures Elephant despite lower rank — but not while in water" },
  2: { movement: "1 square orthogonally", special: "No special abilities" },
  3: { movement: "1 square orthogonally", special: "No special abilities" },
  4: { movement: "1 square orthogonally", special: "No special abilities" },
  5: { movement: "1 square orthogonally", special: "No special abilities" },
  6: { movement: "1 square; leaps over rivers in a straight line", special: "Jump blocked if a Rat is in the river path" },
  7: { movement: "1 square; leaps over rivers in a straight line", special: "Jump blocked if a Rat is in the river path" },
  8: { movement: "1 square orthogonally", special: "Cannot enter rivers; cannot capture the Rat" },
};
