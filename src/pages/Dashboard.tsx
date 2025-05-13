
import React from "react";
import { Package, TrendingUp, Users, Star } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Données fictives pour les graphiques
const deliveryData = [
  { name: "Lun", livraisons: 40 },
  { name: "Mar", livraisons: 35 },
  { name: "Mer", livraisons: 50 },
  { name: "Jeu", livraisons: 45 },
  { name: "Ven", livraisons: 60 },
  { name: "Sam", livraisons: 30 },
  { name: "Dim", livraisons: 25 },
];

const merchantData = [
  { name: "Restaurants", value: 15 },
  { name: "Fast-foods", value: 25 },
  { name: "Femmes au foyer", value: 10 },
  { name: "Épiceries", value: 8 },
  { name: "Autres", value: 12 },
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
          title="Satisfaction clients"
          value="4.8"
          icon={<Star className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Livraisons hebdomadaires
            </CardTitle>
            <Button variant="ghost" size="sm">
              Voir tous
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ background: "white", border: "1px solid #e2e8f0" }}
                    formatter={(value: number) => [`${value} livraisons`, "Nombre"]}
                  />
                  <Bar
                    dataKey="livraisons"
                    fill="#1E2A45"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Répartition des commerçants
            </CardTitle>
            <Button variant="ghost" size="sm">
              Voir tous
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={merchantData} layout="vertical">
                  <CartesianGrid horizontal strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip 
                    contentStyle={{ background: "white", border: "1px solid #e2e8f0" }}
                    formatter={(value: number) => [`${value}`, "Nombre"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="#FFD700"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-tawsil-blue/10 flex items-center justify-center mr-3">
                  <Package className="h-5 w-5 text-tawsil-blue" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Nouvelle livraison #{1000 + item}</p>
                  <p className="text-sm text-gray-500">
                    Restaurant "Le Gourmet" • Alger
                  </p>
                </div>
                <div className="text-sm text-gray-500">il y a 30 min</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
