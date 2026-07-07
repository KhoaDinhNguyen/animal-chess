import GameHomePage from "./game/page";

// Homepage
export default function Home() {
  return <GameHomePage />;
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-8 py-6" style={{ borderTopColor: "#c8892a50" }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
          &copy; 2026 Shou Dou Qi — Animal Chess
        </span>
        <div className="flex items-center gap-2 text-lg">
          <span>🐘</span>
          <span style={{ color: "#2e4a38" }}>·</span>
          <span>🦁</span>
          <span style={{ color: "#2e4a38" }}>·</span>
          <span>🐯</span>
          <span style={{ color: "#2e4a38" }}>·</span>
          <span>🐀</span>
        </div>
        <div className="flex gap-5">
          <a
            href="#"
            className="text-xs tracking-widest uppercase transition-colors hover:text-primary"
            style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
            Privacy
          </a>
          <a
            href="#"
            className="text-xs tracking-widest uppercase transition-colors hover:text-primary"
            style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
            Terms
          </a>
          <a
            href="#"
            className="text-xs tracking-widest uppercase transition-colors hover:text-primary"
            style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
