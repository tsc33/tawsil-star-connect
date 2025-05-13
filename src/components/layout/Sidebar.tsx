
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Users,
  MessageSquare,
  User,
  Store,
  MapPin,
  Menu,
  X,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const sidebarItems = [
    {
      name: "Accueil",
      icon: <Home className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Suivi",
      icon: <MapPin className="h-5 w-5" />,
      path: "/tracking",
    },
    {
      name: "Social",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/social",
    },
    {
      name: "Commerçants",
      icon: <Store className="h-5 w-5" />,
      path: "/merchants",
    },
    {
      name: "Livraisons",
      icon: <Package className="h-5 w-5" />,
      path: "/deliveries",
    },
    {
      name: "Livreurs",
      icon: <Truck className="h-5 w-5" />,
      path: "/messages",
    },
    {
      name: "Profil",
      icon: <User className="h-5 w-5" />,
      path: "/profile",
    },
  ];

  if (isMobile && !isSidebarOpen) {
    return (
      <Button
        onClick={toggleSidebar}
        className="fixed z-50 top-4 left-4 p-2 bg-tawsil-blue text-white rounded-full shadow-lg md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-50 inset-y-0 left-0 w-64 bg-tawsil-blue text-white transition-transform ease-in-out duration-300 flex flex-col shadow-xl md:translate-x-0`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-tawsil-blue font-bold text-xl">
            T
          </div>
          <h1 className="font-bold text-xl tracking-tight">Tawsil Star</h1>
        </div>
        {isMobile && (
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col flex-1 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors duration-200",
                  isActive 
                    ? "bg-white/20 font-medium" 
                    : "hover:bg-tawsil-blue/80"
                )}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-tawsil-blue/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Admin Tawsil</p>
            <p className="text-xs text-white/70">Superviseur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
