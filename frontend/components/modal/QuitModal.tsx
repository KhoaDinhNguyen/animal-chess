"use client";

import { useRouter } from "next/navigation";
import Modal from "./Modal";

interface QuitModalProps {
  onClose: () => void;
  open: boolean;
}

/** Quit modal */
export default function QuitModal(props: QuitModalProps) {
  const { onClose, open } = props;
  const router = useRouter();

  return (
    <Modal onClose={onClose} open={open}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(5,12,7,0.85)", backdropFilter: "blur(6px)" }}
        onClick={onClose}>
        <div
          className="w-full max-w-sm"
          style={{
            background: "#0f1e14",
            border: "1px solid rgba(200,137,42,0.3)",
            borderRadius: "4px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
          }}>
          <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8892a, transparent)" }} />
          <div className="px-6 py-6 text-center">
            <h2 className="text-lg mb-2" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
              Quit Game?
            </h2>
            <p className="text-xs mb-6" style={{ color: "#8fa88a" }}>
              Current game progress will be lost.
            </p>

            {/** Button lists */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 text-xs tracking-widest uppercase transition-colors"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "transparent",
                  border: "1px solid rgba(143,168,138,0.3)",
                  color: "#8fa88a",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                Stay
              </button>
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="flex-1 py-2.5 text-xs tracking-widest uppercase transition-all hover:brightness-110"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "linear-gradient(135deg, #c8892a, #a06a18)",
                  color: "#0b1a10",
                  fontWeight: 600,
                  borderRadius: "2px",
                  border: "none",
                }}>
                Quit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
