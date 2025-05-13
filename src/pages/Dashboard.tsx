
import React from "react";
import { Package, Truck, Users, Store, User } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// User type categories for the dashboard
const userCategories = [
  {
    title: "Clients",
    icon: <User className="h-10 w-10 text-tawsil-blue" />,
    count: "243",
    path: "/clients",
    color: "bg-blue-50",
  },
  {
    title: "Commerçants",
    icon: <Store className="h-10 w-10 text-tawsil-blue" />,
    count: "124",
    path: "/merchants",
    color: "bg-green-50",
    types: [
      { name: "Restaurants", count: 45 },
      { name: "Fast Food", count: 38 },
      { name: "Femmes au foyer", count: 41 }
    ]
  },
  {
    title: "Livreurs",
    icon: <Truck className="h-10 w-10 text-tawsil-blue" />,
    count: "52",
    path: "/deliveries",
    color: "bg-yellow-50",
    types: [
      { name: "Moto", count: 35 },
      { name: "VTC", count: 17 }
    ]
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Livraisons aujourd'hui"
          value="45"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Total des commerçants"
          value="124"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 4, positive: true }}
        />
        <StatCard
          title="Colis en attente"
          value="37"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 2, positive: false }}
        />
        <StatCard
          title="Satisfaction"
          value="4.8"
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Catégories d'utilisateurs</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCategories.map((category) => (
          <Card key={category.title} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className={`${category.color} p-4`}>
              <div className="flex justify-between items-center">
                <div className="bg-white p-3 rounded-full">
                  {category.icon}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <h3 className="text-2xl font-bold text-tawsil-blue">{category.count}</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-3">{category.title}</CardTitle>
              
              {category.types && (
                <div className="space-y-2 mt-4">
                  {category.types.map((type) => (
                    <div key={type.name} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{type.name}</span>
                      <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{type.count}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <Button variant="outline" className="w-full mt-4 border-tawsil-blue text-tawsil-blue hover:bg-tawsil-blue hover:text-white">
                Voir détails
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
