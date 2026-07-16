import GameClient from "@/components/GameClient";
import GamePanel from "@/components/panel/GamePanel";
import CurrentPlayerPanel from "@/components/panel/CurrentPlayerPanel";
import { notFound } from "next/navigation";
import GameIdPanel from "@/components/panel/GameIdPanel";
import { fetchGameByGameId } from "@database";

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  const gameConfig = await fetchGameByGameId(gameId);

  if (gameConfig === null) {
    notFound();
  }

  return (
    <>
      <main className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-6 p-4 lg:p-6 overflow-auto">
        <div
          className="grid gap-x-3 gap-y-3"
          style={{ gridTemplateRows: "repeat(2, auto)", gridTemplateColumns: "repeat(2, auto)" }}>
          <CurrentPlayerPanel />

          <GameIdPanel />

          <GameClient gameData={gameConfig} gameId={gameId} />

          <div style={{ width: 230, minWidth: 200 }}>
            <GamePanel />
          </div>
        </div>
      </main>
    </>
  );
}
