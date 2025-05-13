
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Tentative d'accès à une route inexistante:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center">
          <div className="text-tawsil-blue text-9xl font-bold">404</div>
          <div className="w-20 h-1 bg-tawsil-yellow my-6"></div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Page non trouvée</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild className="bg-tawsil-blue hover:bg-tawsil-blue/90 px-8 py-6 text-lg">
          <a href="/">Retourner à l'accueil</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
