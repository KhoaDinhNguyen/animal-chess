"use server";
import { redirect } from "next/navigation";
import { createGame } from "@/lib/database";

// Join game Action
export async function submitJoinGameForm(formData: FormData) {
  const gameId = formData.get("gameId");
  const userName = formData.get("userName");

  redirect(`/game/${gameId}`);
}

// Create game Action
export async function submitCreateGameForm(formData: FormData) {
  const gameMode = formData.get("gameMode");

  // check whether the game mode correct
  if (gameMode !== "multi" && gameMode !== "single") return;

  const data = await createGame(gameMode);

  if (data === null) {
    console.error("Cannot create game");
    return;
  }

  console.log(data);
  redirect(`/game/${data.id}`)

}