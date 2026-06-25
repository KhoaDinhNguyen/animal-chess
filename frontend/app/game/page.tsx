import JoinGameButton from "@/components/button/JoinGameButton";
import CreateGameButton from "@/components/button/CreateGameButton";

export default function GameHomePage() {
  return (
    <div className="min-h-screen flex flex-col text-foreground relative overflow-x-hidden" style={styles.rootLayout}>
      <div className="flex items-center gap-3 mt-8 mb-12 relative z-10 flex-wrap justify-center">
        <JoinGameButton title="Join game" />
        <CreateGameButton title="Create New Game" />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  rootLayout: {
    background: "radial-gradient(ellipse at 50% 0%, #1a3a22 0%, #0b1a10 55%, #060e09 100%)",
  },
};
