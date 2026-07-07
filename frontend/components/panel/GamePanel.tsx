import PieceInfoPanel from "./PieceInfoPanel";
import { LegendPanel } from "./LegendPanel";

export default function GamePanel() {
  return (
    <div className="flex flex-col gap-2">
      <PieceInfoPanel />
      <LegendPanel />
    </div>
  );
}
