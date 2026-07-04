import JoinGameButton from "@/components/button/JoinGameButton";
import CreateGameButton from "@/components/button/CreateGameButton";
import GameInstructionButton from "@/components/button/GameInstructionButton";
import { ANIMALS } from "@constants/pieces";
import { Footer } from "../page";

// Game Homepage
export default function GameHomePage() {
  return (
    <div
      className="min-h-screen flex flex-col text-foreground relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #1a3a22 0%, #0b1a10 55%, #060e09 100%)",
        fontFamily: "'Noto Serif', Georgia, serif",
      }}>
      {/* Decorative top border */}
      <div
        className="w-full h-0.5"
        style={{
          background: "linear-gradient(90deg, transparent, #c8892a 30%, #b8341b 50%, #c8892a 70%, transparent)",
        }}
      />

      {/** Header */}
      <Header />

      {/** Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative">
        {/* Title block */}
        <HeroTitle />

        {/** Animal rank strip */}
        <AnimalStrip />

        {/** Button lists */}
        <div className="flex items-center gap-3 mt-8 mb-12 relative z-10 flex-wrap justify-center">
          <JoinGameButton title="Join game" />
          <CreateGameButton title="Create New Game" />
          <GameInstructionButton title="Game instructions" />
        </div>
      </main>

      {/** Footer */}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header
      className="relative z-10 flex items-center justify-between px-8 py-5 border-b"
      style={{ borderBottomColor: "#c8892a50" }}>
      <div className="flex items-center gap-3">
        <span className="text-2xl" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#c8892a" }}>
          SDQ
        </span>
        <div className="w-px h-8 bg-border" />
        <span
          className="text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
          Shou Dou Qi - Animal Chess
        </span>
      </div>
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
function HeroTitle() {
  return (
    <div className="text-center mb-4 relative z-10">
      <p
        className="text-sm tracking-[0.35em] uppercase mb-4"
        style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        The Ancient Game of the Jungle
      </p>

      <h1
        className="text-5xl md:text-7xl font-bold leading-tight mb-3"
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          color: "#f0e4c2",
          textShadow: "0 0 60px rgba(200, 137, 42, 0.35)",
        }}>
        Animal Chess
      </h1>

      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #c8892a)" }} />
        <span
          className="text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cinzel', serif", color: "#c8892a" }}>
          Shou Dou Qi
        </span>
        <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #c8892a, transparent)" }} />
      </div>

      <p className="mt-5 max-w-md mx-auto text-base leading-relaxed" style={{ color: "#8fa88a" }}>
        Eight beasts. One jungle. Command your animals across rivers and traps — only the cunning survive.
      </p>
    </div>
  );
}

function AnimalStrip() {
  return (
    <div className="flex items-center gap-3 mt-8 mb-12 relative z-10 flex-wrap justify-center">
      {ANIMALS.map((a) => (
        <div key={a.name} className="flex flex-col items-center gap-2 group cursor-default">
          <div
            className="w-12 h-12 rounded flex items-center justify-center text-2xl transition-transform group-hover:-translate-y-1 duration-200"
            style={{ background: "rgba(200, 137, 42, 0.12)", border: "1px solid rgba(200, 137, 42, 0.25" }}
            title={`Rank ${a.rank}: ${a.name}`}>
            {a.symbol}
          </div>
          <span className="text-xs" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a", fontSize: "0.8rem" }}>
            {a.name}
          </span>
        </div>
      ))}
    </div>
  );
}
