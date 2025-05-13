
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Calendar, Edit, Users, MessageSquare } from "lucide-react";
import SocialPost from "@/components/social/SocialPost";

// Données fictives pour le profil utilisateur
const userProfile = {
  id: "1",
  name: "Ahmed Benali",
  role: "Superviseur",
  avatar: "",
  coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  location: "Alger, Algérie",
  email: "ahmed.benali@tawsilstar.com",
  phone: "+213 555 123 456",
  joinDate: "Mars 2022",
  friends: 78,
  bio: "Superviseur des livraisons pour la région d'Alger. Passionné par la logistique et l'optimisation des routes de livraison.",
};

// Données fictives pour les posts de l'utilisateur
const userPosts = [
  {
    id: "1",
    user: {
      name: userProfile.name,
      role: userProfile.role,
      avatar: userProfile.avatar,
    },
    content: "Félicitations à toute l'équipe pour le record de livraisons atteint hier! 💪 Continuons comme ça!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 15,
    comments: [
      {
        id: "c1",
        user: {
          name: "Karim Hadj",
          avatar: "",
        },
        content: "Bravo à tous! C'est un travail d'équipe 🌟",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
      },
    ],
  },
  {
    id: "2",
    user: {
      name: userProfile.name,
      role: userProfile.role,
      avatar: userProfile.avatar,
    },
    content: "Nous accueillons 5 nouveaux livreurs cette semaine! Bienvenue dans l'équipe Tawsil Star! 🚚✨",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    likes: 24,
    comments: [],
  },
];

// Données fictives pour les amis de l'utilisateur
const userFriends = [
  { id: "1", name: "Karim Hadj", role: "Superviseur", avatar: "" },
  { id: "2", name: "Samira Mokhtar", role: "Responsable Logistique", avatar: "" },
  { id: "3", name: "Mohamed Salim", role: "Livreur", avatar: "" },
  { id: "4", name: "Leila Kaddour", role: "Commerçante", avatar: "" },
  { id: "5", name: "Omar Benmessaoud", role: "Directeur", avatar: "" },
  { id: "6", name: "Sofia Larbi", role: "Commerçante", avatar: "" },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("publications");
  
  return (
    <div className="container mx-auto max-w-4xl">
      {/* Couverture et photo de profil */}
      <div className="relative mb-16">
        <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg">
          <img 
            src={userProfile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src={userProfile.avatar} />
            <AvatarFallback className="bg-tawsil-blue text-white text-2xl">
              {userProfile.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold mt-2">{userProfile.name}</h1>
          <p className="text-sm text-gray-500">{userProfile.role}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Section latérale */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="font-semibold text-lg flex items-center justify-between">
                Informations
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Edit className="h-4 w-4" />
                </Button>
              </h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Rejoint en {userProfile.joinDate}</span>
                </div>
              </div>
              
              <p className="pt-2 text-sm">{userProfile.bio}</p>
            </CardContent>
          </Card>
          
          {/* Amis */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg flex items-center justify-between mb-3">
                Amis
                <span className="text-sm text-gray-500 font-normal">{userProfile.friends}</span>
              </h2>
              
              <div className="grid grid-cols-3 gap-2">
                {userFriends.slice(0, 6).map((friend) => (
                  <div key={friend.id} className="flex flex-col items-center">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-tawsil-blue/20 text-tawsil-blue">
                        {friend.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs mt-1 text-center font-medium truncate w-full">
                      {friend.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-2 text-sm text-tawsil-blue">
                Voir tous les amis
              </Button>
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button className="bg-tawsil-blue hover:bg-tawsil-blue/90">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" className="border-tawsil-blue text-tawsil-blue">
              <Users className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>
        
        {/* Section principale */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-4 bg-transparent">
              <TabsTrigger 
                value="publications"
                className="data-[state=active]:bg-tawsil-blue data-[state=active]:text-white"
              >
                Publications
              </TabsTrigger>
              <TabsTrigger 
                value="photos"
                className="data-[state=active]:bg-tawsil-blue data-[state=active]:text-white"
              >
                Photos
              </TabsTrigger>
              <TabsTrigger 
                value="amis"
                className="data-[state=active]:bg-tawsil-blue data-[state=active]:text-white"
              >
                Amis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="publications">
              {userPosts.map((post) => (
                <SocialPost
                  key={post.id}
                  id={post.id}
                  user={post.user}
                  content={post.content}
                  image={post.image}
                  createdAt={post.createdAt}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="photos">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Photos</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square rounded-md bg-gray-100 overflow-hidden">
                        {i % 2 === 0 && (
                          <img 
                            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                            alt="Photo"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amis">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Tous les amis ({userProfile.friends})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userFriends.map((friend) => (
                      <div key={friend.id} className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-tawsil-blue/20 text-tawsil-blue">
                            {friend.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{friend.name}</h4>
                          <p className="text-xs text-gray-500">{friend.role}</p>
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

export default Profile;
