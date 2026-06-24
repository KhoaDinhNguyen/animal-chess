import { fetchGameByGameId } from "@/api/gameAPI";
import GameClient from "@/components/GameClient";
import Link from "next/link";

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
              <p>Sorry! We can't find the game in our database</p>
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

  return <GameClient initialGame={game} />;
}
