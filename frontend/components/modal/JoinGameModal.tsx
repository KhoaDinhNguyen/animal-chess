import Modal, { ModalAccentLine, ModalTitle, ModalCard } from "./Modal";
import AppButton from "../button/AppButton";

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
      <ModalCard className="w-full max-w-md relative">
        {/** top accent line */}
        <ModalAccentLine />

        {/** modal's body */}
        <div className="px-8 py-7">
          <ModalTitle title="Join Game" subtitle="Enter the Jungle" />

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
              {/* <div className="flex flex-col gap-1.5">
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
              </div> */}
            </div>

            <div className="flex gap-3 mt-8">
              <AppButton
                variant="secondary"
                type="button"
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={onClose}>
                Close
              </AppButton>

              <AppButton variant="primary" type="submit">
                Enter
              </AppButton>
            </div>
          </form>
        </div>
      </ModalCard>
    </Modal>
  );
}

const styles: Record<string, React.CSSProperties> = {
  inputContainer: {
    background: "#1a2c20",
    border: "1px solid rgba(200,137,42,0.25)",
    borderRadius: "2px",
    color: "#f0e4c2",
    fontFamily: "'Noto Serif', serif",
  },
};
