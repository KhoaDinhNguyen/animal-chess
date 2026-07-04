import GameClient from "@/components/GameClient";
import GamePanel from "@/components/panel/GamePanel";
import CurrentPlayerPanel from "@/components/panel/CurrentPlayerPanel";
import { notFound } from "next/navigation";
import HelpButton from "@/components/button/HelpButton";
import QuitButton from "@/components/button/QuitButton";
import { Footer } from "@/app/page";
import GameIdPanel from "@/components/panel/GameIdPanel";
import { fetchGameByGameId } from "@database";

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  const game = await fetchGameByGameId(gameId);

  if (game === null) {
    notFound();
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: "'Noto Serif', Georgia, serif",
        background: "radial-gradient(ellipse at 50% 0%, #1a3a22 0%, #0b1a10 55%, #060e09 100%)",
        color: "#f0e4c2",
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

      {/** Main */}
      <main className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-6 p-4 lg:p-6 overflow-auto">
        <div
          className="grid gap-x-3"
          style={{ gridTemplateRows: "repeat(2, auto)", gridTemplateColumns: "repeat(2, auto)" }}>
          <CurrentPlayerPanel />
          <GameIdPanel />
          <GameClient initialGame={game} gameId={gameId} />
          <div className="flex flex-col gap-3" style={{ width: 230, minWidth: 200 }}>
            <GamePanel />
          </div>
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
      className="relative z-50 flex items-center justify-between px-8 py-5 border-b"
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

      {/** Button lists */}
      <div className="flex items-center gap-2">
        <HelpButton />
        <QuitButton />
      </div>
    </header>
  );
}
