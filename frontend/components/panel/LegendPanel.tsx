import { ArrowUp, Swords } from "lucide-react";
import { COLORS } from "@constants/colors";

export function LegendPanel() {
  return (
    <div className="p-3 rounded-sm" style={{ background: "#0f1e14", border: "1px solid rgba(200,137,42,0.2)" }}>
      <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        Legend
      </p>
      <div className="space-y-1.5">
        {BOARD_LEGEND.map(({ label, icon }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}
            <span className="text-xs" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Circle({ color }: { color: string }) {
  return (
    <div className="w-3 h-3 rounded-sm" style={{ background: color, border: "1px solid rgba(255,255,255,0.1)" }} />
  );
}

const BOARD_LEGEND: { label: string; icon: React.ReactNode }[] = [
  { label: "Land", icon: <Circle color="#1e3a26" /> },
  { label: "River / Lake", icon: <Circle color="#0b1e40" /> },
  { label: "Player 1 Den", icon: <Circle color={`${COLORS.P1_COLOR}80`} /> },
  { label: "Player 2 Den", icon: <Circle color={`${COLORS.P2_COLOR}80`} /> },
  { label: "Trap", icon: <Circle color="#260701" /> },
  { label: "Valid move", icon: <ArrowUp size={12} style={{ color: "rgba(200,137,42,0.9)" }} /> },
  { label: " Capture available", icon: <Swords size={12} style={{ color: "#e05040" }} /> },
];
