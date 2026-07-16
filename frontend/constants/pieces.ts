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



export const INSTRUCTIONS = [
  {
    title: "Overview",
    body: "Shou Dou Qi, also known as Jungle Chess or Animal Chess, is a two-player Chinese strategy board game. Each player commands eight animals ranked by strength, moving across a jungle terrain to capture the opponent's den.",
  },
  {
    title: "The Board",
    body: "The board is 9x7 squares. It contains two dens (one per player), three traps flanking each den, and two six-squares river in the center. River squares block most animals — only the Rat may enter water.",
  },
  {
    title: "Animal Ranks",
    body: "Animals are ranked 1-8. Higher rank captures lower rank. Exception: the Rat (rank 1) can capture the Elephant (rank 8) when entering its square. Traps weaken any animal to rank 0 — capturable by anything.",
  },
  {
    title: "Movement",
    body: "Each animal moves one square orthogonally per turn. The Lion and Tiger may leap over the river in a straight line — unless a Rat is in their path. The Rat is the only piece that can swim across the river.",
  },
  {
    title: "Winning",
    body: "A player wins by moving any animal into the opponent's den, or by capturing all of the opponent's pieces. Pieces cannot enter their own den.",
  },
];