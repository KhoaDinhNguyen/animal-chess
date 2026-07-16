const styles = {
  rootContainer: {
    background: "rgba(5, 12, 7, 0.85)",
    backdropFilter: "blur(6px)"
  },
  accent: {
    background: "linear-gradient(90deg, transparent, #c8892a, transparent)"
  },
  cardContainer: {
    background: "#0f1e14",
    border: "1px solid rgba(200,137,42,0.3)",
    borderRadius: "4px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
  },
  title: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "#f0e4c2"
  },
  subtitle: {
    fontFamily: "'Cinzel', serif",
    color: "#8fa88a"
  }
} satisfies Record<string, React.CSSProperties>

export const gameInstructionStyles = {
  numberSection: {
    fontFamily: "'Cinzel', serif",
    background: "rgba(200,137,42,0.15)",
    border: "1px solid rgba(200,137,42,0.3)",
    color: "#c8892a",
    fontSize: "0.6rem",
  },
} satisfies Record<string, React.CSSProperties>;

export default styles;