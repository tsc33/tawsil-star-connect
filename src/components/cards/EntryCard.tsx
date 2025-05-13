
import React from "react";
import { MapPin, Phone, Edit, Trash, Store, User, Truck, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type EntryCardProps = {
  id: string;
  name: string;
  userType: "merchant" | "customer" | "driver";
  activityType?: string;
  location: string;
  phone: string;
  facebookUrl?: string;
  isApproved: boolean;
  image?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleApproval: (id: string) => void;
};

// Helper function to get the appropriate icon based on user type
const getUserTypeIcon = (userType: string) => {
  switch (userType) {
    case "merchant":
      return <Store className="h-4 w-4 mr-2 text-tawsil-blue" />;
    case "driver":
      return <Truck className="h-4 w-4 mr-2 text-tawsil-blue" />;
    default:
      return <User className="h-4 w-4 mr-2 text-tawsil-blue" />;
  }
};

// Helper function to get the activity type label
const getActivityTypeLabel = (activityType?: string) => {
  switch (activityType) {
    case "restaurant":
      return "Restaurant";
    case "fastfood":
      return "Fast Food";
    case "homebased":
      return "Femme au foyer";
    case "grocery":
      return "Épicerie";
    case "bakery":
      return "Boulangerie";
    case "pastry":
      return "Pâtisserie";
    default:
      return "Autre";
  }
};

// Helper function to get user type label
const getUserTypeLabel = (userType: string) => {
  switch (userType) {
    case "merchant":
      return "Commerçant";
    case "driver":
      return "Livreur";
    default:
      return "Client";
  }
};

const EntryCard: React.FC<EntryCardProps> = ({
  id,
  name,
  userType,
  activityType,
  location,
  phone,
  facebookUrl,
  isApproved,
  image,
  onEdit,
  onDelete,
  onToggleApproval,
}) => {
  return (
    <Card className="overflow-hidden card-hover border-gray-200">
      <div className="relative h-24 bg-gradient-to-r from-tawsil-blue to-tawsil-blue/70">
        <div className="absolute -bottom-10 left-4">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarImage src={image} />
            <AvatarFallback className="bg-white text-tawsil-blue text-xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={isApproved ? "bg-green-500" : "bg-red-500"}>
            {isApproved ? "Approuvé" : "En attente"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-12 pb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center mt-1">
              {getUserTypeIcon(userType)}
              <p className="text-sm text-gray-500">{getUserTypeLabel(userType)}</p>
            </div>
            {userType === "merchant" && activityType && (
              <p className="text-sm text-gray-500 mt-1">{getActivityTypeLabel(activityType)}</p>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className={isApproved ? "border-red-500 text-red-500 hover:bg-red-50" : "border-green-500 text-green-500 hover:bg-green-50"}
            onClick={() => onToggleApproval(id)}
          >
            {isApproved ? <X className="h-4 w-4 mr-1" /> : <Check className="h-4 w-4 mr-1" />}
            {isApproved ? "Désapprouver" : "Approuver"}
          </Button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-600">{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-600">{phone}</span>
          </div>
          {facebookUrl && (
            <div className="mt-2">
              <a 
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Page Facebook
              </a>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 flex justify-between py-2">
        <Button 
          size="sm"
          variant="ghost" 
          className="text-tawsil-blue hover:text-tawsil-blue hover:bg-tawsil-blue/10"
          onClick={() => onEdit(id)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Modifier
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(id)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EntryCard;
