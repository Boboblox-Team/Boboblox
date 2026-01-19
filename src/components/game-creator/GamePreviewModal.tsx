import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GameData } from "./types";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GamePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData: GameData;
  title: string;
}

export const GamePreviewModal = ({ isOpen, onClose, gameData, title }: GamePreviewModalProps) => {
  const fallbackPlayer = {
    id: "runtime-player",
    type: "player",
    x: 50,
    y: 50,
    width: 40,
    height: 40,
    color: "#4ade80"
  };

  const player = gameData.elements.find(el => el.type === "player") || fallbackPlayer;

  const [playerPos, setPlayerPos] = useState({ x: player.x, y: player.y });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [collectedItems, setCollectedItems] = useState<string[]>([]);

  const resetGame = useCallback(() => {
    setPlayerPos({ x: player.x, y: player.y });
    setScore(0);
    setGameState("playing");
    setCollectedItems([]);
  }, [player]);

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  useEffect(() => {
    if (!isOpen || gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 10;
      let newX = playerPos.x;
      let newY = playerPos.y;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          newY = Math.max(0, playerPos.y - speed);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          newY = Math.min(300, playerPos.y + speed);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          newX = Math.max(0, playerPos.x - speed);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          newX = Math.min(500, playerPos.x + speed);
          break;
      }

      setPlayerPos({ x: newX, y: newY });

      gameData.elements.forEach(el => {
        if (el.type === "player" || collectedItems.includes(el.id)) return;

        const collision =
          newX < el.x + el.width &&
          newX + player.width > el.x &&
          newY < el.y + el.height &&
          newY + player.height > el.y;

        if (collision) {
          switch (el.type) {
            case "coin":
              setCollectedItems(prev => [...prev, el.id]);
              setScore(prev => prev + 10);
              break;
            case "enemy":
            case "spike":
              setGameState("lost");
              break;
            case "goal":
              setGameState("won");
              break;
          }
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, playerPos, gameData, player, gameState, collectedItems]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{title || "Untitled Game"}</span>
            <span className="text-primary">Score: {score}</span>
          </DialogTitle>
        </DialogHeader>

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
                  backgroundColor: el.color
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
              backgroundColor: player.color
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

        <p className="text-center text-sm text-muted-foreground">
          Use <kbd className="px-2 py-1 bg-secondary rounded">W A S D</kbd> or{" "}
          <kbd className="px-2 py-1 bg-secondary rounded">Arrow Keys</kbd> to move
        </p>
      </DialogContent>
    </Dialog>
  );
};
