import { PageLogo } from "@/app/layout";

export default function LobbyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LobbyHeader />
      {children}
    </>
  );
}

function LobbyHeader() {
  return (
    <header
      className="relative z-10 flex items-center justify-between px-8 py-5 border-b"
      style={{ borderBottomColor: "#c8892a50" }}>
      <PageLogo />
      <nav className="hidden md:flex items-center gap-6">
        {/* <a
          href="#"
          className="text-sm tracking-widest uppercase transition-colors hover:text-primary"
          style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
          Play
        </a>
        <a
          href="#"
          className="text-sm tracking-widest uppercase transition-colors hover:text-primary"
          style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
          Leaderboard
        </a>
        <a
          href="#"
          className="text-sm tracking-widest uppercase transition-colors hover:text-primary"
          style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
          About
        </a> */}
      </nav>
    </header>
  );
}
