import { fetchGameByGameId } from "@/api/gameAPI";
import GameClient from "@/components/GameClient";
import GamePanel from "@/components/panel/GamePanel";
import Link from "next/link";
import CurrentPlayerPanel from "@/components/panel/CurrentPlayerPanel";

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;

  const game = await fetchGameByGameId(gameId);

  if (game === null) {
    return (
      <div className="modal" tabIndex={-1} style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Game not found
              </h1>
            </div>
            <div className="modal-body">
              <p>Sorry! We can&apos;t find the game in our database</p>
            </div>
            <div className="modal-footer">
              <Link href="/game" className="btn btn-primary">
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: "'Noto Serif', Georgia, serif",
        background: "radial-gradient(ellipse at 50% 0%, #1a3a22 0%, #0b1a10 55%, #060e09 100%)",
        color: "#f0e4c2",
      }}>
      <main className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-6 p-4 lg:p-6 overflow-auto">
        <div className="grid grid-cols-2 gap-x-3" style={{ gridTemplateRows: "auto 1f" }}>
          <CurrentPlayerPanel />
          <div></div>
          <GameClient initialGame={game} />
          <div className="flex flex-col gap-3" style={{ width: 230, minWidth: 200 }}>
            <GamePanel />
          </div>
        </div>
      </main>
    </div>
  );
}
