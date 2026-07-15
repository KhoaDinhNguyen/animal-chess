import { MouseEventHandler } from "react";
import styles from "./modal.styles";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonVariantProps {
  type: React.HTMLInputTypeAttribute;
  className: string;
  style: React.CSSProperties;
}

interface ModalButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
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

/**
 * Reusable modal button with predefined visual variants.
 */
export function ModalButton(props: ModalButtonProps) {
  const { variant, onClick, onMouseEnter, onMouseLeave, children, style } = props;

  const config = MODAL_BUTTON_VARIANTS[variant];

  return (
    <button
      type={config.type}
      onClick={onClick}
      className={config.className}
      style={{ ...config.style, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </button>
  );
}

// Shared configuration for each modal button variant.
const MODAL_BUTTON_VARIANTS = {
  primary: {
    type: "submit",
    className:
      "flex-1 py-2.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:brightness-110",
    style: {
      fontFamily: "'Cinzel', serif",
      background: "linear-gradient(135deg, #c8892a, #a06a18)",
      color: "#0b1a10",
      fontWeight: 600,
      borderRadius: "2px",
      border: "none",
    },
  },
  secondary: {
    type: "button",
    className:
      "flex-1 py-2.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors",
    style: {
      fontFamily: "'Cinzel', serif",
      background: "transparent",
      border: "1px solid rgba(143,168,138,0.3)",
      color: "#8fa88a",
      borderRadius: "2px",
    },
  },
  tertiary: {
    type: "button",
    className: "w-8 h-8 flex items-center justify-center transition-colors rounded-sm hover:bg-white/5",
    style: { color: "#8fa88a" },
  },
} satisfies Record<string, ButtonVariantProps>;
