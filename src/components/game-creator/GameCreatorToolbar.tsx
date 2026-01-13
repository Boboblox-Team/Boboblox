import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Play, Upload, ArrowLeft, Palette } from "lucide-react";
import { Link } from "react-router-dom";

interface GameCreatorToolbarProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onPublish: () => void;
  onPreview: () => void;
  isSaving: boolean;
  isPublished: boolean;
  backgroundColor: string;
  onBackgroundChange: (color: string) => void;
}

const backgroundColors = [
  '#1e293b', // Slate
  '#0f172a', // Dark blue
  '#1e1b4b', // Indigo
  '#3b0764', // Purple
  '#1a2e05', // Forest
  '#450a0a', // Dark red
];

export const GameCreatorToolbar = ({
  title,
  onTitleChange,
  onSave,
  onPublish,
  onPreview,
  isSaving,
  isPublished,
  backgroundColor,
  onBackgroundChange,
}: GameCreatorToolbarProps) => {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="container mx-auto flex flex-wrap items-center gap-4">
        {/* Back button */}
        <Link to="/create">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>

        {/* Title input */}
        <div className="flex-1 min-w-[200px]">
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="My Awesome Game"
            className="font-display text-lg font-bold bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          />
        </div>

        {/* Background color picker */}
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-1">
            {backgroundColors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  backgroundColor === color ? 'border-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onBackgroundChange(color)}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onPreview} className="gap-2">
            <Play className="w-4 h-4" />
            Preview
          </Button>
          <Button variant="outline" onClick={onSave} disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="hero" onClick={onPublish} disabled={isSaving} className="gap-2">
            <Upload className="w-4 h-4" />
            {isPublished ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
};
