import { useParams } from "react-router-dom";

// Island scenes
import TropicalIsland from "./islands/TropicalIsland";

const WorldPlay = () => {
  const { islandName } = useParams();

  // Decode URL (turns %20 into spaces)
  const decoded = islandName ? decodeURIComponent(islandName) : "";

  // Map island names to components
  const islandScenes: Record<string, JSX.Element> = {
    "Tropical Island": <TropicalIsland />,
    // Add more islands here later:
    // "City Center": <CityCenter />,
    // "Snowy Mountains": <SnowyMountains />,
  };

  // If island doesn't exist
  if (!islandScenes[decoded]) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Island "{decoded}" not found.
      </div>
    );
  }

  // Load the correct island scene
  return islandScenes[decoded];
};

export default WorldPlay;
