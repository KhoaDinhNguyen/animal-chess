"use server";
import { redirect } from "next/navigation";
import { createGame } from "@/api/gameAPI";

// Join game Action
export async function submitJoinGameForm(formData: FormData) {
  const gameId = formData.get("gameId");
  const userName = formData.get("userName");

  redirect(`/game/${gameId}`);
}

// Create game Action
export async function submitCreateGameForm(formData: FormData) {
  const gameType = formData.get("gameMode");


  if (gameType === "multi") {
    const game = await createGame();

    if (game === null) {
      console.log("TODO");
    }
    else {
      redirect(`/game/${game.gameId}`)
    }
  }
  else {
    console.log("TODO");
  }

}