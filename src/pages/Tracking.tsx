
import React, { useState } from "react";
import { Truck, Search, MapPin, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const deliveryVehicles = [
  {
    id: "v1",
    driverName: "Ahmed Kader",
    vehicleType: "Moto",
    status: "active",
    location: "Alger Centre",
    lastUpdate: "Il y a 5 minutes",
    deliveries: 12,
    completed: 7,
    currentDelivery: "Restaurant Le Gourmet → Client #354",
  },
  {
    id: "v2",
    driverName: "Mohamed Salim",
    vehicleType: "VTC",
    status: "active",
    location: "Bab Ezzouar",
    lastUpdate: "Il y a 2 minutes",
    deliveries: 8,
    completed: 3,
    currentDelivery: "Fast Burger → Client #129",
  },
  {
    id: "v3",
    driverName: "Sofiane Hamdi",
    vehicleType: "Moto",
    status: "idle",
    location: "Kouba",
    lastUpdate: "Il y a 15 minutes",
    deliveries: 10,
    completed: 10,
    currentDelivery: "En pause déjeuner",
  },
  {
    id: "v4",
    driverName: "Kamel Boudiaf",
    vehicleType: "VTC",
    status: "active",
    location: "Hydra",
    lastUpdate: "Il y a 8 minutes",
    deliveries: 14,
    completed: 9,
    currentDelivery: "Pâtisserie Warda → Client #211",
  },
];

const deliveryStatuses = [
  { count: 32, label: "En cours", color: "bg-blue-500" },
  { count: 18, label: "En attente", color: "bg-orange-400" },
  { count: 73, label: "Complétées", color: "bg-green-500" },
  { count: 5, label: "Problèmes", color: "bg-red-500" },
];

const Tracking = () => {
  const [activeVehicle, setActiveVehicle] = useState(deliveryVehicles[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les véhicules selon le terme de recherche
  const filteredVehicles = deliveryVehicles.filter(
    (vehicle) =>
      vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un livreur ou une zone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {deliveryStatuses.map((status, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <span className="text-sm">
                {status.label}: <strong>{status.count}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Liste des véhicules à gauche */}
        <div className="w-full md:w-1/3 space-y-4">
          <h2 className="font-semibold text-lg">Livreurs actifs</h2>
          <div className="space-y-3 max-h-[500px] overflow-auto pr-2">
            {filteredVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={`cursor-pointer hover:border-tawsil-blue transition-colors ${
                  activeVehicle.id === vehicle.id ? "border-tawsil-blue bg-blue-50" : ""
                }`}
                onClick={() => setActiveVehicle(vehicle)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-full">
                    <AvatarFallback className="bg-tawsil-blue text-white">
                      {vehicle.driverName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{vehicle.driverName}</h3>
                      <Badge
                        className={`${
                          vehicle.status === "active"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                      >
                        {vehicle.vehicleType}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {vehicle.location}
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span>
                        {vehicle.completed}/{vehicle.deliveries} livraisons
                      </span>
                      <span className="text-gray-500">{vehicle.lastUpdate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Carte et détails à droite */}
        <div className="flex-1">
          <Tabs defaultValue="map">
            <TabsList className="mb-4">
              <TabsTrigger value="map">Carte</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-4">
              {/* Zone de la carte */}
              <div className="h-[400px] rounded-lg bg-gray-100 border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 opacity-50 flex items-center justify-center">
                  <div className="text-center p-6 bg-white rounded-lg shadow-md z-10">
                    <MapPin className="h-12 w-12 text-tawsil-blue mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Carte de suivi GPS</h3>
                    <p className="text-gray-600">
                      Intégration avec EcoTrack en cours de développement.
                    </p>
                    <Button className="mt-4 bg-tawsil-blue hover:bg-tawsil-blue/90">
                      Voir la démo
                    </Button>
                  </div>
                </div>
                {/* Ici sera intégrée la carte réelle avec l'API */}
              </div>

              {/* Informations du livreur sélectionné */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-tawsil-blue text-white">
                        {activeVehicle.driverName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{activeVehicle.driverName}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Truck className="h-4 w-4 mr-1" />
                          {activeVehicle.vehicleType}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {activeVehicle.location}
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm font-medium">En cours:</div>
                      <div className="text-sm text-gray-600">
                        {activeVehicle.currentDelivery}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Livraisons</div>
                      <div className="text-xl font-semibold text-tawsil-blue">
                        {activeVehicle.deliveries}
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Complétées</div>
                      <div className="text-xl font-semibold text-green-600">
                        {activeVehicle.completed}
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Restantes</div>
                      <div className="text-xl font-semibold text-orange-600">
                        {activeVehicle.deliveries - activeVehicle.completed}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-tawsil-blue hover:bg-tawsil-blue/90">
                      Appeler
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Détails des livraisons de {activeVehicle.driverName}
                  </h3>

                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div
                          className={`w-2 h-12 rounded-full ${
                            i === 0
                              ? "bg-green-500"
                              : i === 1
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        />

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">
                              {i === 0
                                ? "Restaurant Le Gourmet"
                                : i === 1
                                ? "Fast Burger"
                                : `Commande #10${i}`}
                            </h4>
                            <Badge
                              variant="outline"
                              className={
                                i === 0
                                  ? "border-green-500 text-green-700"
                                  : i === 1
                                  ? "border-blue-500 text-blue-700"
                                  : ""
                              }
                            >
                              {i === 0
                                ? "Livré"
                                : i === 1
                                ? "En cours"
                                : "En attente"}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-1 text-sm">
                            <User className="h-4 w-4 mr-1 text-gray-400" />
                            <span>
                              {i === 0
                                ? "Client #354 - Kouider Ahmed"
                                : i === 1
                                ? "Client #129 - Salim Benameur"
                                : `Client #${111 + i}`}
                            </span>
                          </div>
                        </div>

                        <div className="text-right text-sm">
                          <div className="text-gray-500">
                            {i === 0
                              ? "10:30"
                              : i === 1
                              ? "En cours"
                              : `${i + 11}:${i * 10 < 10 ? "0" + i * 10 : i * 10}`}
                          </div>
                          <div className="flex items-center justify-end mt-1 text-xs text-gray-400">
                            <Package className="h-3.5 w-3.5 mr-1" />
                            <span>{i + 1} colis</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
