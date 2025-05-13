
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Social from "./pages/Social";
import Merchants from "./pages/Merchants";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="social" element={<Social />} />
            <Route path="merchants" element={<Merchants />} />
            {/* Routes à implémenter plus tard */}
            <Route path="tracking" element={<div className="py-12 text-center">Page de suivi (à implémenter)</div>} />
            <Route path="deliveries" element={<div className="py-12 text-center">Page des livraisons (à implémenter)</div>} />
            <Route path="messages" element={<div className="py-12 text-center">Page des messages (à implémenter)</div>} />
            <Route path="profile" element={<div className="py-12 text-center">Page de profil (à implémenter)</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
