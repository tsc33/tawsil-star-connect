
import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MerchantCard, { MerchantCardProps } from "@/components/merchants/MerchantCard";
import MerchantForm from "@/components/merchants/MerchantForm";
import { toast } from "sonner";

// Données fictives pour les commerçants
const sampleMerchants: Omit<MerchantCardProps, "onEdit" | "onDelete">[] = [
  {
    id: "1",
    name: "Le Gourmet",
    type: "Restaurant",
    location: "Alger",
    phone: "0555123456",
    facebookUrl: "https://facebook.com/legourmet",
  },
  {
    id: "2",
    name: "Fast Burger",
    type: "Fast-food",
    location: "Oran",
    phone: "0555789123",
    facebookUrl: "https://facebook.com/fastburger",
  },
  {
    id: "3",
    name: "Pâtisserie Warda",
    type: "Femme au foyer",
    location: "Constantine",
    phone: "0555456789",
    facebookUrl: "https://facebook.com/patisseriewarda",
  },
  {
    id: "4",
    name: "Spicy Corner",
    type: "Restaurant",
    location: "Annaba",
    phone: "0555111222",
    facebookUrl: "https://facebook.com/spicycorner",
  },
  {
    id: "5",
    name: "Délices Maison",
    type: "Femme au foyer",
    location: "Tlemcen",
    phone: "0555333444",
    facebookUrl: "https://facebook.com/delicesmaison",
  },
  {
    id: "6",
    name: "Express Pizza",
    type: "Fast-food",
    location: "Sétif",
    phone: "0555555666",
    facebookUrl: "https://facebook.com/expresspizza",
  },
];

const Merchants = () => {
  const [merchants, setMerchants] = useState(sampleMerchants);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<any | null>(null);

  // Filtrer les commerçants
  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch = merchant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || merchant.type === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddMerchant = (data: any) => {
    const newMerchant = {
      id: `merchant-${Date.now()}`,
      name: data.name,
      type: data.category,
      location: data.wilaya,
      phone: data.phone,
      facebookUrl: data.facebookUrl,
    };
    setMerchants([newMerchant, ...merchants]);
    toast.success("Commerçant ajouté avec succès");
  };

  const handleEditMerchant = (data: any) => {
    if (!editingMerchant) return;
    
    const updatedMerchants = merchants.map((merchant) =>
      merchant.id === editingMerchant.id
        ? {
            ...merchant,
            name: data.name,
            type: data.category,
            location: data.wilaya,
            phone: data.phone,
            facebookUrl: data.facebookUrl,
          }
        : merchant
    );
    
    setMerchants(updatedMerchants);
    setEditingMerchant(null);
    toast.success("Commerçant mis à jour avec succès");
  };

  const handleDeleteMerchant = (id: string) => {
    setMerchants(merchants.filter((merchant) => merchant.id !== id));
    toast.success("Commerçant supprimé avec succès");
  };

  return (
    <div className="space-y-6">
      {/* En-tête et filtres */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un commerçant..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les catégories</SelectItem>
              <SelectItem value="Restaurant">Restaurant</SelectItem>
              <SelectItem value="Fast-food">Fast-food</SelectItem>
              <SelectItem value="Femme au foyer">Femme au foyer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          className="bg-tawsil-blue hover:bg-tawsil-blue/90 w-full sm:w-auto"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un commerçant
        </Button>
      </div>

      {/* Liste des commerçants */}
      {filteredMerchants.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun commerçant trouvé</h3>
          <p className="text-gray-500">
            Essayez d'ajuster vos filtres ou d'ajouter un nouveau commerçant
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map((merchant) => (
            <MerchantCard
              key={merchant.id}
              {...merchant}
              onEdit={(id) => {
                const merchantToEdit = merchants.find((m) => m.id === id);
                if (merchantToEdit) {
                  setEditingMerchant({
                    ...merchantToEdit,
                    category: merchantToEdit.type,
                    wilaya: merchantToEdit.location,
                  });
                }
              }}
              onDelete={handleDeleteMerchant}
            />
          ))}
        </div>
      )}

      {/* Formulaire d'ajout/modification */}
      <MerchantForm
        isOpen={isFormOpen || !!editingMerchant}
        onClose={() => {
          setIsFormOpen(false);
          setEditingMerchant(null);
        }}
        onSubmit={editingMerchant ? handleEditMerchant : handleAddMerchant}
        initialData={
          editingMerchant
            ? {
                name: editingMerchant.name,
                category: editingMerchant.type,
                phone: editingMerchant.phone,
                wilaya: editingMerchant.location,
                facebookUrl: editingMerchant.facebookUrl || "",
              }
            : undefined
        }
        isEditing={!!editingMerchant}
      />
    </div>
  );
};

export default Merchants;
