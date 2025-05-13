
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Search, Filter, Store, User, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EntryCard, { EntryCardProps } from "@/components/cards/EntryCard";
import EntryForm from "@/components/forms/EntryForm";
import { toast } from "sonner";

// Données fictives pour les entrées
const sampleEntries: Omit<EntryCardProps, "onEdit" | "onDelete" | "onToggleApproval">[] = [
  {
    id: "1",
    name: "Le Gourmet",
    userType: "merchant",
    activityType: "restaurant",
    location: "Alger",
    phone: "0555123456",
    facebookUrl: "https://facebook.com/legourmet",
    isApproved: true,
  },
  {
    id: "2",
    name: "Fast Burger",
    userType: "merchant",
    activityType: "fastfood",
    location: "Oran",
    phone: "0555789123",
    facebookUrl: "https://facebook.com/fastburger",
    isApproved: true,
  },
  {
    id: "3",
    name: "Pâtisserie Warda",
    userType: "merchant",
    activityType: "homebased",
    location: "Constantine",
    phone: "0555456789",
    facebookUrl: "https://facebook.com/patisseriewarda",
    isApproved: false,
  },
  {
    id: "4",
    name: "Ahmed Benameur",
    userType: "driver",
    location: "Annaba",
    phone: "0555111222",
    isApproved: true,
  },
  {
    id: "5",
    name: "Samia Belhadi",
    userType: "customer",
    location: "Tlemcen",
    phone: "0555333444",
    isApproved: true,
  },
  {
    id: "6",
    name: "Express Pizza",
    userType: "merchant",
    activityType: "fastfood",
    location: "Sétif",
    phone: "0555555666",
    facebookUrl: "https://facebook.com/expresspizza",
    isApproved: false,
  },
];

const CategoryEntries = () => {
  const { category } = useParams<{ category: string }>();
  const [entries, setEntries] = useState(sampleEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [activityFilter, setActivityFilter] = useState<string>("");
  const [approvalFilter, setApprovalFilter] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any | null>(null);

  // Get entries based on the category parameter
  const categoryEntries = entries.filter((entry) => {
    if (category === "merchants") return entry.userType === "merchant";
    if (category === "customers") return entry.userType === "customer";
    if (category === "drivers") return entry.userType === "driver";
    return true;
  });

  // Filter entries based on search, activity type, and approval status
  const filteredEntries = categoryEntries.filter((entry) => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActivity = !activityFilter || entry.activityType === activityFilter;
    const matchesApproval = 
      approvalFilter === "" ? true : 
      approvalFilter === "approved" ? entry.isApproved : 
      !entry.isApproved;
    
    // Tab filtering
    const matchesTab = 
      activeTab === "all" ? true :
      activeTab === "approved" ? entry.isApproved :
      !entry.isApproved;
    
    return matchesSearch && matchesActivity && matchesApproval && matchesTab;
  });

  const handleAddEntry = (data: any) => {
    const newEntry = {
      id: `entry-${Date.now()}`,
      name: data.name,
      userType: data.userType,
      activityType: data.activityType,
      location: data.wilaya,
      phone: data.phone,
      facebookUrl: data.facebookUrl,
      isApproved: data.isApproved,
    };
    setEntries([newEntry, ...entries]);
    toast.success(`${data.userType === "merchant" ? "Commerçant" : data.userType === "driver" ? "Livreur" : "Client"} ajouté avec succès`);
  };

  const handleEditEntry = (data: any) => {
    if (!editingEntry) return;
    
    const updatedEntries = entries.map((entry) =>
      entry.id === editingEntry.id
        ? {
            ...entry,
            name: data.name,
            userType: data.userType,
            activityType: data.activityType,
            location: data.wilaya,
            phone: data.phone,
            facebookUrl: data.facebookUrl,
            isApproved: data.isApproved,
          }
        : entry
    );
    
    setEntries(updatedEntries);
    setEditingEntry(null);
    toast.success("Information mise à jour avec succès");
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast.success("Supprimé avec succès");
  };

  const handleToggleApproval = (id: string) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id
        ? {
            ...entry,
            isApproved: !entry.isApproved,
          }
        : entry
    );
    
    setEntries(updatedEntries);
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      toast.success(`${entry.isApproved ? "Désapprouvé" : "Approuvé"} avec succès`);
    }
  };

  // Function to get the title and icon based on category
  const getCategoryInfo = () => {
    switch (category) {
      case "merchants":
        return { title: "Commerçants", icon: <Store className="h-6 w-6" /> };
      case "customers":
        return { title: "Clients", icon: <User className="h-6 w-6" /> };
      case "drivers":
        return { title: "Livreurs", icon: <Truck className="h-6 w-6" /> };
      default:
        return { title: "Toutes les catégories", icon: <Store className="h-6 w-6" /> };
    }
  };

  const { title, icon } = getCategoryInfo();

  // Helper function to get the appropriate filters based on the category
  const getActivityFilters = () => {
    if (category === "merchants") {
      return [
        { value: "", label: "Toutes les activités" },
        { value: "restaurant", label: "Restaurant" },
        { value: "fastfood", label: "Fast Food" },
        { value: "homebased", label: "Femme au foyer" },
        { value: "grocery", label: "Épicerie" },
        { value: "bakery", label: "Boulangerie" },
        { value: "pastry", label: "Pâtisserie" },
      ];
    }
    return [];
  };

  return (
    <div className="space-y-6">
      {/* En-tête et info catégorie */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-tawsil-blue/10">
          {icon}
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {category === "merchants" && (
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Activité" />
              </SelectTrigger>
              <SelectContent>
                {getActivityFilters().map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={approvalFilter} onValueChange={setApprovalFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les statuts</SelectItem>
              <SelectItem value="approved">Approuvés</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          className="bg-tawsil-blue hover:bg-tawsil-blue/90 w-full sm:w-auto"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {/* Tabs pour filtrer par statut */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="approved">Approuvés</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Liste des entrées */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun résultat trouvé</h3>
          <p className="text-gray-500">
            Essayez d'ajuster vos filtres ou d'ajouter une nouvelle entrée
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              {...entry}
              onEdit={(id) => {
                const entryToEdit = entries.find((e) => e.id === id);
                if (entryToEdit) {
                  setEditingEntry({
                    ...entryToEdit,
                    wilaya: entryToEdit.location,
                  });
                }
              }}
              onDelete={handleDeleteEntry}
              onToggleApproval={handleToggleApproval}
            />
          ))}
        </div>
      )}

      {/* Formulaire d'ajout/modification */}
      <EntryForm
        isOpen={isFormOpen || !!editingEntry}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEntry(null);
        }}
        onSubmit={editingEntry ? handleEditEntry : handleAddEntry}
        initialData={
          editingEntry
            ? {
                name: editingEntry.name,
                userType: editingEntry.userType,
                activityType: editingEntry.activityType || "",
                phone: editingEntry.phone,
                wilaya: editingEntry.location,
                facebookUrl: editingEntry.facebookUrl || "",
                isApproved: editingEntry.isApproved,
              }
            : undefined
        }
        isEditing={!!editingEntry}
      />
    </div>
  );
};

export default CategoryEntries;
