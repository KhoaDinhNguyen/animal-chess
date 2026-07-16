import GameHomePage from "./(lobby)/game/page";
import LobbyLayout from "./(lobby)/game/layout";

// Homepage
export default function Home() {
  return (
    <LobbyLayout>
      <GameHomePage />
    </LobbyLayout>
  );
}
