import Modal from "./Modal";

interface JoinGameModalProps {
  formAction: (formData: FormData) => void;
  onClose: () => void;
  open: boolean;
}

// Join-game modal UI
export default function JoinGameModal(props: JoinGameModalProps) {
  const { formAction, onClose, open } = props;

  return (
    <Modal onClose={onClose} open={open}>
      <div className="w-full max-w-md relative" style={styles.rootContainer}>
        {/** top accent line */}
        <div
          className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #c8892a, transparent)" }}></div>

        {/** modal's body */}
        <div className="px-8 py-7">
          {/** modal's title */}
          <h2 className="text-2xl mb-1" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
            Join Game
          </h2>
          <p
            className="text-xs tracking-widest uppercase mb-7"
            style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
            Enter the Jungle
          </p>

          {/** modal's form */}
          <form action={formAction}>
            <div className="space-y-5">
              {/** Game ID's input */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
                  Game ID
                </label>
                <input
                  type="text"
                  name="gameId"
                  placeholder="e.g. 0"
                  className="w-full px-4 py-2.5 outline-none transition-colors text-sm"
                  style={styles.inputContainer}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#c8892a")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(200,137,42,0.25)")}
                />
              </div>

              {/** Your name input */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 outline-none transition-colors text-sm"
                  style={styles.inputContainer}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#c8892a")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(200,137,42,0.25)")}
                />
              </div>
            </div>

            {/** Button list */}
            <div className="flex gap-3 mt-8">
              {/** Close button */}
              <input
                type="button"
                value="Close"
                onClick={onClose}
                className="flex-1 py-2.5 text-sm tracking-widest uppercase transition-colors"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "transparent",
                  border: "1px solid rgba(143,168,138,0.3)",
                  color: "#8fa88a",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              />

              {/** Submit button */}
              <input
                type="submit"
                value="Enter"
                className="flex-1 py-2.5 text-sm tracking-widest uppercase transition-all hover:brightness-110"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "linear-gradient(135deg, #c8892a, #a06a18)",
                  color: "#0b1a10",
                  fontWeight: 600,
                  borderRadius: "2px",
                  border: "none",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

const styles: Record<string, React.CSSProperties> = {
  rootContainer: {
    background: "#0f1e14",
    border: "1px solid rgba(200,137,42,0.3)",
    borderRadius: "4px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
  },
  inputContainer: {
    background: "#1a2c20",
    border: "1px solid rgba(200,137,42,0.25)",
    borderRadius: "2px",
    color: "#f0e4c2",
    fontFamily: "'Noto Serif', serif",
  },
};
