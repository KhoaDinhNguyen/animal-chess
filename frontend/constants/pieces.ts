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

export const ANIMALS = [
  { rank: 8, name: "Elephant", symbol: "🐘" },
  { rank: 7, name: "Lion", symbol: "🦁" },
  { rank: 6, name: "Tiger", symbol: "🐯" },
  { rank: 5, name: "Leopard", symbol: "🐆" },
  { rank: 4, name: "Wolf", symbol: "🐺" },
  { rank: 3, name: "Dog", symbol: "🐕" },
  { rank: 2, name: "Cat", symbol: "🐱" },
  { rank: 1, name: "Mouse", symbol: "🐀" },
];
