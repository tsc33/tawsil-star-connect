
import React from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl md:text-2xl font-bold text-tawsil-blue">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher..."
            className="pl-10 bg-gray-50 border-gray-200 w-64"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-600"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
