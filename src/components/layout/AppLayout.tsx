
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Déterminer le titre en fonction du chemin actuel
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Tableau de bord";
      case "/tracking":
        return "Suivi des livraisons";
      case "/social":
        return "Réseau Social";
      case "/merchants":
        return "Gestion des commerçants";
      case "/deliveries":
        return "Livraisons";
      case "/messages":
        return "Messages";
      case "/profile":
        return "Profil";
      default:
        return "Tawsil Star";
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col overflow-hidden ${isMobile ? "" : "md:ml-64"}`}>
        <Header title={getTitle()} toggleSidebar={toggleSidebar} />
        
        <main 
          className="flex-1 overflow-y-auto p-4 md:p-6"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
