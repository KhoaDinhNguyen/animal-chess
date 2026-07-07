import { MouseEventHandler } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// Modal's template
export default function Modal(props: ModalProps) {
  const { open, onClose, children } = props;

  if (!open) return null;

  // On click's event
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(5, 12, 7, 0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClick}>
      {children}
    </div>
  );
}
