
import React from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
  logoSrc?: string;
};

const Header = ({ title, toggleSidebar, logoSrc }: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            {logoSrc ? (
              <img src={logoSrc} alt="Tawsil Star Logo" className="w-8 h-8 object-contain" />
            ) : (
              <div className="w-8 h-8 bg-tawsil-blue rounded-md flex items-center justify-center text-white font-bold text-xl">
                T
              </div>
            )}
            <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
