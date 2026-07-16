import { MouseEventHandler } from "react";
import styles from "./modal.styles";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

// Renders the backdrop and closes the modal when the backdrop is clicked.
export default function Modal(props: ModalProps) {
  const { open, onClose, children } = props;

  if (!open) return null;

  /**
   * Close modal
   */
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClose !== undefined && e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={styles.rootContainer}
      onClick={onClick}>
      {children}
    </div>
  );
}

export function ModalCard({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{ ...styles.cardContainer, ...style }}>
      {children}
    </div>
  );
}

// Renders a line
export function ModalAccentLine({ style }: { style?: React.CSSProperties }) {
  return <div className="h-0.5 w-full" style={{ ...styles.accent, ...style }} />;
}

// Renders the modal's title
export function ModalTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-2xl mb-1" style={styles.title}>
        {title}
      </h2>
      <p className="text-xs tracking-widest uppercase mb-7" style={styles.subtitle}>
        {subtitle}
      </p>
    </div>
  );
}
