import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProfileEditor from "./pages/ProfileEditor";
import Lore from "./pages/Lore";
import Cutscene from "./pages/Cutscene";
import Story from "./pages/Story";
import Characters from "./pages/Characters";
import Worlds from "./pages/Worlds";
import WorldExplorer from "./pages/WorldExplorer";
import CreatorCode from "./pages/CreatorCode";
import Cutscenes from "./pages/Cutscenes";
import OAuthConsent from "./pages/OAuthConsent";
import OAuthCallback from "./pages/OAuthCallback";

// Islands
import TropicalIsland from "./pages/islands/TropicalIsland";
import CityCentre from "./pages/islands/CityCentre";
import SnowyMountains from "./pages/islands/SnowyMountains";
import DesertDunes from "./pages/islands/DesertDunes";
import ForestAdventure from "./pages/islands/ForestAdventure";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/oauth/authorize" element={<OAuthConsent />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
          <Route path="/shop" element={<Shop />} />

          {/* Lore & Story Pages */}
          <Route path="/lore" element={<Lore />} />
          <Route path="/story" element={<Story />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/worlds" element={<Worlds />} />
          <Route path="/creator-code" element={<CreatorCode />} />
          <Route path="/cutscenes" element={<Cutscenes />} />
          <Route path="/cutscene/:id" element={<Cutscene />} />
          <Route path="/worlds/explore" element={<WorldExplorer />} />

          {/* Island Play Routes */}
          <Route path="/worlds/play/TropicalIsland" element={<TropicalIsland />} />
          <Route path="/worlds/play/CityCenter" element={<CityCentre />} />
          <Route path="/worlds/play/SnowyMountains" element={<SnowyMountains />} />
          <Route path="/worlds/play/DesertDunes" element={<DesertDunes />} />
          <Route path="/worlds/play/ForestAdventure" element={<ForestAdventure />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEditor />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
