import { Hourglass } from "lucide-react";
import styles from "./WaitingTurnIndicator.module.css";

export default function WaitingTurnIndicator() {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm"
      style={{
        background: "rgba(200,137,42,0.12)",
        border: "1px solid rgba(200,137,42,0.35)",
      }}>
      <span className={`${styles["hg-spin"]} inline-flex`} style={{ color: "#c8892a" }}>
        <Hourglass size={11} />
      </span>
      <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#c8892a" }}>
        Waiting
      </span>
      <span className="flex gap-1 ml-0.5">
        <WaitingDot order={1} />
        <WaitingDot order={2} />
        <WaitingDot order={2} />
      </span>
    </div>
  );
}

function WaitingDot({ order }: { order: number }) {
  return (
    <span
      className={`${styles[`dot-${order}`]} inline-block rounded-full`}
      style={{ width: 4, height: 4, background: "#c8892a" }}
    />
  );
}
