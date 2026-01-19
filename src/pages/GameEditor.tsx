import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ObjectPalette } from "@/components/game-creator/ObjectPalette";
import { PropertiesPanel } from "@/components/game-creator/PropertiesPanel";
import { Workspace } from "@/components/game-creator/Workspace";
import { GameCreatorToolbar } from "@/components/game-creator/GameCreatorToolbar";
import { GamePreviewModal } from "@/components/game-creator/GamePreviewModal";
import { GameObject, GameData, OBJECT_TEMPLATES } from "@/components/game-creator/types";
import { ChevronDown, ChevronRight, Layers } from "lucide-react";

const GameEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [title, setTitle] = useState("My Awesome Game");
  const [description, setDescription] = useState("");
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [backgroundColor, setBackgroundColor] = useState("#1e293b");
  const [draggingType, setDraggingType] = useState<GameObject['type'] | null>(null);
  const [touchDraggingType, setTouchDraggingType] = useState<GameObject['type'] | null>(null);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [gameId, setGameId] = useState<string | null>(id || null);
  
  // Collapsible panel states
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [propertiesOpen, setPropertiesOpen] = useState(true);

  const selectedObject = objects.find(o => o.id === selectedObjectId) || null;

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
      // Load new object format, or migrate from old elements
      if (gameData.objects) {
        setObjects(gameData.objects);
      } else if (gameData.elements) {
        // Migrate old elements to new object format
        const migratedObjects: GameObject[] = gameData.elements.map((el, index) => ({
          id: el.id,
          type: 'part' as const,
          name: `Object ${index + 1}`,
          x: el.x,
          y: el.y,
          width: el.width,
          height: el.height,
          color: el.color,
        }));
        setObjects(migratedObjects);
      }
      setBackgroundColor(gameData.backgroundColor || "#1e293b");
      setIsPublished(data.is_published);
    }
  };

  const handleDragStart = (type: GameObject['type']) => {
    setDraggingType(type);
  };

  const handleTouchDragStart = (type: GameObject['type']) => {
    setTouchDraggingType(type);
  };

  const handleTouchDragEnd = () => {
    setTouchDraggingType(null);
  };

  const handleAddObject = (type: GameObject['type'], x: number, y: number) => {
    const template = OBJECT_TEMPLATES[type];
    const newObject: GameObject = {
      id: crypto.randomUUID(),
      type,
      name: `${template.name} ${objects.filter(o => o.type === type).length + 1}`,
      x: Math.round(x / 40) * 40,
      y: Math.round(y / 40) * 40,
      width: template.width,
      height: template.height,
      color: template.color,
    };
    setObjects(prev => [...prev, newObject]);
    setDraggingType(null);
    setSelectedObjectId(newObject.id);
  };

  const handleMoveObject = (id: string, x: number, y: number) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, x, y } : obj
    ));
  };

  const handleResizeObject = (id: string, width: number, height: number) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, width, height } : obj
    ));
  };

  const handleUpdateObject = (id: string, updates: Partial<GameObject>) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, ...updates } : obj
    ));
  };

  const handleDeleteObject = (id: string) => {
    setObjects(prev => prev.filter(obj => obj.id !== id));
    if (selectedObjectId === id) {
      setSelectedObjectId(null);
    }
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
      objects,
      elements: [], // Keep for backwards compatibility
      logic: [],
      backgroundColor,
    };

    try {
      if (gameId) {
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
        
        window.history.replaceState(null, '', `/create/edit/${data.id}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save game");
    } finally {
      setIsSaving(false);
    }
  };

  const gameData: GameData = {
    objects,
    elements: [],
    logic: [],
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Toolbar */}
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

      {/* Main Layout: Fixed left sidebar + flexible workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Fixed 280px width */}
        <aside className="w-[280px] min-w-[280px] max-w-[280px] flex flex-col border-r border-border bg-card/80 overflow-hidden">
          
          {/* Explorer Panel - Objects List */}
          <div className="flex flex-col border-b border-border">
            <button
              onClick={() => setExplorerOpen(!explorerOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted text-sm font-semibold text-foreground"
            >
              {explorerOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Layers className="w-4 h-4" />
              Explorer
              <span className="ml-auto text-xs text-muted-foreground bg-background px-1.5 py-0.5 rounded">
                {objects.length}
              </span>
            </button>
            
            {explorerOpen && (
              <div className="p-3 max-h-[200px] overflow-y-auto">
                <ObjectPalette 
                  onDragStart={handleDragStart} 
                  onTouchDragStart={handleTouchDragStart} 
                />
              </div>
            )}
          </div>

          {/* Properties Panel */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <button
              onClick={() => setPropertiesOpen(!propertiesOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted text-sm font-semibold text-foreground"
            >
              {propertiesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              Properties
            </button>
            
            {propertiesOpen && (
              <div className="flex-1 overflow-y-auto p-3">
                <PropertiesPanel
                  selectedObject={selectedObject}
                  onUpdateObject={handleUpdateObject}
                  onDeleteObject={handleDeleteObject}
                />
                
                {/* Description field */}
                <div className="mt-4 pt-4 border-t border-border">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">
                    Game Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell players about your game..."
                    className="w-full h-20 bg-background border border-border rounded-lg p-2 text-sm resize-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Workspace - Takes remaining space on the right */}
        <main className="flex-1 overflow-hidden">
          <Workspace
            objects={objects}
            draggingType={draggingType}
            touchDraggingType={touchDraggingType}
            onAddObject={handleAddObject}
            onMoveObject={handleMoveObject}
            onResizeObject={handleResizeObject}
            onSelectObject={setSelectedObjectId}
            onDeleteObject={handleDeleteObject}
            selectedObjectId={selectedObjectId}
            backgroundColor={backgroundColor}
            onTouchDragEnd={handleTouchDragEnd}
          />
        </main>
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
