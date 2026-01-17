import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ElementPalette } from "@/components/game-creator/ElementPalette";
import { LogicPanel } from "@/components/game-creator/LogicPanel";
import { GameCanvas } from "@/components/game-creator/GameCanvas";
import { GameCreatorToolbar } from "@/components/game-creator/GameCreatorToolbar";
import { GamePreviewModal } from "@/components/game-creator/GamePreviewModal";
import { GameElement, LogicBlock, GameData, ELEMENT_TEMPLATES } from "@/components/game-creator/types";

const GameEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [title, setTitle] = useState("My Awesome Game");
  const [description, setDescription] = useState("");
  const [elements, setElements] = useState<GameElement[]>([]);
  const [logicBlocks, setLogicBlocks] = useState<LogicBlock[]>([]);
  const [backgroundColor, setBackgroundColor] = useState("#1e293b");
  const [draggingType, setDraggingType] = useState<string | null>(null);
  const [touchDraggingType, setTouchDraggingType] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [gameId, setGameId] = useState<string | null>(id || null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to create games!");
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Load existing game if editing
  useEffect(() => {
    if (id && user) {
      loadGame(id);
    }
  }, [id, user]);

  const loadGame = async (gameId: string) => {
    const { data, error } = await supabase
      .from('user_games')
      .select('*')
      .eq('id', gameId)
      .eq('user_id', user?.id)
      .single();

    if (error) {
      toast.error("Failed to load game");
      navigate("/create");
      return;
    }

    if (data) {
      setTitle(data.title);
      setDescription(data.description || "");
      const gameData = data.game_data as unknown as GameData;
      setElements(gameData.elements || []);
      setLogicBlocks(gameData.logic || []);
      setBackgroundColor(gameData.backgroundColor || "#1e293b");
      setIsPublished(data.is_published);
    }
  };

  const handleDragStart = (type: string) => {
    setDraggingType(type);
  };

  const handleTouchDragStart = (type: string) => {
    setTouchDraggingType(type);
  };

  const handleTouchDragEnd = () => {
    setTouchDraggingType(null);
  };

  const handleAddElement = (type: string, x: number, y: number) => {
    const template = ELEMENT_TEMPLATES[type as keyof typeof ELEMENT_TEMPLATES];
    const newElement: GameElement = {
      id: crypto.randomUUID(),
      type: type as GameElement['type'],
      x,
      y,
      width: template.width,
      height: template.height,
      color: template.color,
    };
    setElements(prev => [...prev, newElement]);
    setDraggingType(null);
  };

  const handleMoveElement = (id: string, x: number, y: number) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, x, y } : el
    ));
  };

  const handleDeleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElementId(null);
    // Also remove any logic referencing this element
    setLogicBlocks(prev => prev.filter(lb => lb.targetId !== id));
  };

  const handleAddLogic = (type: string) => {
    const newLogic: LogicBlock = {
      id: crypto.randomUUID(),
      type: type as LogicBlock['type'],
      value: type === 'add_score' ? 10 : undefined,
    };
    setLogicBlocks(prev => [...prev, newLogic]);
  };

  const handleRemoveLogic = (id: string) => {
    setLogicBlocks(prev => prev.filter(lb => lb.id !== id));
  };

  const handleUpdateLogic = (id: string, updates: Partial<LogicBlock>) => {
    setLogicBlocks(prev => prev.map(lb => 
      lb.id === id ? { ...lb, ...updates } : lb
    ));
  };

  const handleSave = async (publish = false) => {
    if (!user) {
      toast.error("Please sign in to save");
      return;
    }

    if (!title.trim()) {
      toast.error("Please give your game a name!");
      return;
    }

    setIsSaving(true);

    const gameData: GameData = {
      elements,
      logic: logicBlocks,
      backgroundColor,
    };

    try {
      if (gameId) {
        // Update existing game
        const { error } = await supabase
          .from('user_games')
          .update({
            title,
            description,
            game_data: gameData as any,
            is_published: publish ? true : isPublished,
          })
          .eq('id', gameId);

        if (error) throw error;

        if (publish && !isPublished) {
          setIsPublished(true);
          toast.success("🎉 Your game is now live on Boboblox!");
        } else {
          toast.success("Game saved!");
        }
      } else {
        // Create new game
        const { data, error } = await supabase
          .from('user_games')
          .insert({
            user_id: user.id,
            title,
            description,
            game_data: gameData as any,
            is_published: publish,
          })
          .select()
          .single();

        if (error) throw error;

        setGameId(data.id);
        
        if (publish) {
          setIsPublished(true);
          toast.success("🎉 Your game is now live on Boboblox!");
        } else {
          toast.success("Game saved!");
        }
        
        // Update URL without reload
        window.history.replaceState(null, '', `/create/edit/${data.id}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save game");
    } finally {
      setIsSaving(false);
    }
  };

  const gameData: GameData = {
    elements,
    logic: logicBlocks,
    backgroundColor,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameCreatorToolbar
        title={title}
        onTitleChange={setTitle}
        onSave={() => handleSave(false)}
        onPublish={() => handleSave(true)}
        onPreview={() => setIsPreviewOpen(true)}
        isSaving={isSaving}
        isPublished={isPublished}
        backgroundColor={backgroundColor}
        onBackgroundChange={setBackgroundColor}
      />

      <div className="flex-1 flex">
        {/* Left sidebar - Elements */}
        <aside className="w-64 p-4 border-r border-border overflow-y-auto">
          <ElementPalette onDragStart={handleDragStart} onTouchDragStart={handleTouchDragStart} />
        </aside>

        {/* Main canvas */}
        <main className="flex-1 p-6 overflow-auto">
          <GameCanvas
            elements={elements}
            draggingType={draggingType}
            onAddElement={handleAddElement}
            onMoveElement={handleMoveElement}
            onSelectElement={setSelectedElementId}
            onDeleteElement={handleDeleteElement}
            selectedElementId={selectedElementId}
            backgroundColor={backgroundColor}
            touchDraggingType={touchDraggingType}
            onTouchDragEnd={handleTouchDragEnd}
          />
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>💡 Tip: Drag game pieces from the left, then add rules on the right!</p>
          </div>
        </main>

        {/* Right sidebar - Logic */}
        <aside className="w-72 p-4 border-l border-border overflow-y-auto">
          <LogicPanel
            logicBlocks={logicBlocks}
            elements={elements}
            onAddLogic={handleAddLogic}
            onRemoveLogic={handleRemoveLogic}
            onUpdateLogic={handleUpdateLogic}
          />

          {/* Description */}
          <div className="mt-4 bg-card border border-border rounded-xl p-4">
            <h3 className="font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="text-xl">📝</span> Description
            </h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell players about your game..."
              className="w-full h-20 bg-background border border-border rounded-lg p-2 text-sm resize-none"
            />
          </div>
        </aside>
      </div>

      <GamePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        gameData={gameData}
        title={title}
      />
    </div>
  );
};

export default GameEditor;
