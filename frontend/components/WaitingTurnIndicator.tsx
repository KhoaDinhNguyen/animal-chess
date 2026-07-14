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
        <span
          className={`${styles["dot-1"]} inline-block rounded-full`}
          style={{ width: 4, height: 4, background: "#c8892a" }}
        />
        <span
          className={`${styles["dot-2"]} inline-block rounded-full`}
          style={{ width: 4, height: 4, background: "#c8892a" }}
        />
        <span
          className={`${styles["dot-3"]} inline-block rounded-full`}
          style={{ width: 4, height: 4, background: "#c8892a" }}
        />
      </span>
    </div>
  );
}
