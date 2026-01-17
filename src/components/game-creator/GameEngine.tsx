import { useState, useEffect, useCallback } from "react";
import { GameData } from "./types";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GameEngineProps {
  gameData: GameData;
  title?: string;
}

export const GameEngine = ({ gameData, title }: GameEngineProps) => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [collectedItems, setCollectedItems] = useState<string[]>([]);

  const player = gameData.elements.find(el => el.type === "player");

  const resetGame = useCallback(() => {
    if (player) {
      setPlayerPos({ x: player.x, y: player.y });
    }
    setScore(0);
    setGameState("playing");
    setCollectedItems([]);
  }, [player]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (!player || gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 10;
      let newX = playerPos.x;
      let newY = playerPos.y;

      if (["ArrowUp", "w", "W"].includes(e.key)) newY -= speed;
      if (["ArrowDown", "s", "S"].includes(e.key)) newY += speed;
      if (["ArrowLeft", "a", "A"].includes(e.key)) newX -= speed;
      if (["ArrowRight", "d", "D"].includes(e.key)) newX += speed;

      setPlayerPos({ x: newX, y: newY });

      gameData.elements.forEach(el => {
        if (el.type === "player" || collectedItems.includes(el.id)) return;

        const collision =
          newX < el.x + el.width &&
          newX + player.width > el.x &&
          newY < el.y + el.height &&
          newY + player.height > el.y;

        if (collision) {
          if (el.type === "coin") {
            setCollectedItems(prev => [...prev, el.id]);
            setScore(prev => prev + 10);
          }
          if (el.type === "enemy" || el.type === "spike") {
            setGameState("lost");
          }
          if (el.type === "goal") {
            setGameState("won");
          }
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, gameData, player, gameState, collectedItems]);

  if (!player) {
    return <p className="text-center py-10">Add a player to test the game.</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-display font-bold mb-2">{title}</h2>
      <p className="text-primary mb-4">Score: {score}</p>

      <div
        className="relative w-full aspect-[16/10] rounded-lg overflow-hidden"
        style={{ backgroundColor: gameData.backgroundColor }}
      >
        {gameData.elements.map(el => {
          if (el.type === "player") return null;
          if (collectedItems.includes(el.id)) return null;

          return (
            <div
              key={el.id}
              className="absolute rounded-lg flex items-center justify-center"
              style={{
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                backgroundColor: el.color,
              }}
            >
              {el.type === "coin" && "⭐"}
              {el.type === "enemy" && "👾"}
              {el.type === "goal" && "🏆"}
              {el.type === "spike" && "🔺"}
              {el.type === "block" && "🧱"}
              {el.type === "platform" && "➖"}
            </div>
          );
        })}

        <div
          className="absolute rounded-lg flex items-center justify-center transition-all duration-75"
          style={{
            left: playerPos.x,
            top: playerPos.y,
            width: player.width,
            height: player.height,
            backgroundColor: player.color,
          }}
        >
          🎮
        </div>

        {gameState !== "playing" && (
          <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4">
            <p className="text-4xl font-display font-bold">
              {gameState === "won" ? "🏆 You Win!" : "💥 Game Over!"}
            </p>
            <p className="text-xl text-muted-foreground">Score: {score}</p>
            <Button onClick={resetGame} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Use <kbd className="px-2 py-1 bg-secondary rounded">W A S D</kbd> or{" "}
        <kbd className="px-2 py-1 bg-secondary rounded">Arrow Keys</kbd> to move
      </p>
    </div>
  );
};
