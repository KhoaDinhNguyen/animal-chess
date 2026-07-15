import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "primary-border";
type ButtonType = "submit" | "button" | "reset";

interface ButtonVariantProps {
  className: string;
  style: React.CSSProperties;
}

interface ButtonProps {
  variant: ButtonVariant;
  type: ButtonType;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  className?: string;
}

export default function AppButton(props: ButtonProps) {
  const { variant, onClick, onMouseEnter, onMouseLeave, children, style, type, className } = props;

  const config = BUTTON_VARIANTS[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(config.className, className)}
      style={{ ...config.style, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </button>
  );
}

// Shared configuration for each modal button variant.
const BUTTON_VARIANTS = {
  primary: {
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
  "primary-border": {
    className: "",
    style: {
      fontFamily: "'Cinzel', serif",
      background: "transparent",
      color: "#c8892a",
      fontWeight: 600,
      borderRadius: "2px",
      border: "1px solid #c8892a",
      boxShadow: "0 0 20px rgba(200,137,42,0.1)",
    },
  },
  secondary: {
    className: "flex-1 py-2.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all",
    style: {
      fontFamily: "'Cinzel', serif",
      background: "transparent",
      border: "1px solid rgba(143,168,138,0.3)",
      color: "#8fa88a",
      borderRadius: "2px",
    },
  },
  tertiary: {
    className: "w-8 h-8 flex items-center justify-center transition-colors rounded-sm hover:bg-white/5",
    style: { color: "#8fa88a" },
  },
} satisfies Record<string, ButtonVariantProps>;
