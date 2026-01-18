import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Games from "./pages/Games";
import Shop from "./pages/Shop";
import Create from "./pages/Create";
import GameEditor from "./pages/GameEditor";
import NotFound from "./pages/NotFound";
import PlayPage from "./pages/play";
import Profile from "./pages/Profile";
import ProfileEditor from "./pages/ProfileEditor";

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
          <Route path="/games" element={<Games />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/new" element={<GameEditor />} />
          <Route path="/create/edit/:id" element={<GameEditor />} />
          <Route path="/play/:id" element={<PlayPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEditor />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
