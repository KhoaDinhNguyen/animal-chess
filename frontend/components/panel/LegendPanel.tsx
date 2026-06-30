import { ArrowUp, Swords } from "lucide-react";
import { COLORS } from "@/app/game/page";

export function LegendPanel() {
  return (
    <div className="p-3 rounded-sm" style={{ background: "#0f1e14", border: "1px solid rgba(200,137,42,0.2)" }}>
      <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        Legend
      </p>
      <div className="space-y-1.5">
        {[
          { swatch: "#1e3a26", label: "Land" },
          { swatch: "#0b1e40", label: "River / Lake" },
          { swatch: `${COLORS.P1_COLOR}80`, label: "Player 1 Den" },
          { swatch: `${COLORS.P2_COLOR}80`, label: "Player 2 Den" },
          { swatch: "#260701", label: "Trap" },
        ].map(({ swatch, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: swatch, border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <span className="text-xs" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
              {label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <ArrowUp size={12} style={{ color: "rgba(200,137,42,0.9)" }} />
          <span className="text-xs" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
            Valid move
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Swords size={12} style={{ color: "#e05040" }} />
          <span className="text-xs" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
            Capture available
          </span>
        </div>
      </div>
    </div>
  );
}
