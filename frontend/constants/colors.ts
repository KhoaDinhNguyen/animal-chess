import { PlayerRole } from "@/game/core/types";

const P1_COLOR = "#0077b6";
const P2_COLOR = "#ef233c";
const OFFLINE_COLOR = "#6c757d"

export function getPlayerColor(player: PlayerRole, opacity: number = 100) {
  const color = player === "player1" ? P1_COLOR : P2_COLOR;
  if (opacity === 100) return color;
  return `${color}${opacity}`
};

export const COLORS = {
  P1_COLOR,
  P2_COLOR,
  OFFLINE_COLOR
};