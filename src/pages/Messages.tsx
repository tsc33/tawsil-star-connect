
import React, { useState } from "react";
import { Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Exemple de données pour les conversations
const sampleConversations = [
  {
    id: "1",
    user: {
      name: "Ahmed Kader",
      role: "Livreur",
      avatar: "",
    },
    lastMessage: "J'ai terminé ma tournée dans le secteur ouest",
    time: "10:23",
    unread: 3,
  },
  {
    id: "2",
    user: {
      name: "Samira Benchikh",
      role: "Commerçante",
      avatar: "",
    },
    lastMessage: "La commande est prête pour aujourd'hui",
    time: "Hier",
    unread: 0,
  },
  {
    id: "3",
    user: {
      name: "Karim Haddad",
      role: "Superviseur",
      avatar: "",
    },
    lastMessage: "Réunion à 15h pour discuter des nouvelles routes",
    time: "Hier",
    unread: 0,
  },
  {
    id: "4",
    user: {
      name: "Leila Mansouri",
      role: "Client",
      avatar: "",
    },
    lastMessage: "Est-ce que ma commande arrivera aujourd'hui ?",
    time: "Lun",
    unread: 1,
  },
];

// Exemple de messages dans une conversation
const sampleMessages = [
  {
    id: "m1",
    sender: "Ahmed Kader",
    content: "Bonjour, j'ai terminé ma tournée dans le secteur ouest",
    time: "10:23",
    isMine: false,
  },
  {
    id: "m2",
    sender: "Moi",
    content: "Parfait ! Combien de livraisons as-tu effectuées ?",
    time: "10:25",
    isMine: true,
  },
  {
    id: "m3",
    sender: "Ahmed Kader",
    content: "12 livraisons en tout, tout s'est bien passé sauf à l'adresse rue Didouche où personne n'était présent",
    time: "10:28",
    isMine: false,
  },
  {
    id: "m4",
    sender: "Moi",
    content: "D'accord, essaie de rappeler le client pour cette adresse",
    time: "10:30",
    isMine: true,
  },
  {
    id: "m5",
    sender: "Ahmed Kader",
    content: "Je l'ai déjà contacté, il sera disponible à partir de 14h",
    time: "10:32",
    isMine: false,
  },
  {
    id: "m6",
    sender: "Ahmed Kader",
    content: "Je peux y retourner après ma pause déjeuner",
    time: "10:32",
    isMine: false,
  },
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(sampleConversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() && !selectedFile) return;

    // En situation réelle, ceci enverrait le message à une API
    console.log("Message envoyé:", messageInput);
    console.log("Fichier:", selectedFile);
    
    // Réinitialiser les champs
    setMessageInput("");
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -mt-2 -mx-4 md:-mx-6">
      <Tabs defaultValue="messages" className="flex flex-col h-full">
        <TabsList className="mb-0 self-center">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="flex flex-1 overflow-hidden mt-0 data-[state=active]:flex data-[state=active]:flex-1">
          <div className="hidden md:flex md:w-80 border-r flex-col bg-white">
            <div className="p-3 border-b">
              <Input placeholder="Rechercher des messages..." className="rounded-full bg-gray-100" />
            </div>
            <div className="overflow-y-auto flex-1">
              {sampleConversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${activeConversation.id === conversation.id ? 'bg-blue-50' : ''}`}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback className="bg-tawsil-blue text-white">
                      {conversation.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm truncate">{conversation.user.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="ml-2 bg-tawsil-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{conversation.user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col bg-white">
            {/* En-tête de conversation */}
            <div className="p-3 border-b flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activeConversation?.user.avatar} />
                <AvatarFallback className="bg-tawsil-blue text-white">
                  {activeConversation?.user.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeConversation?.user.name}</h3>
                <p className="text-xs text-gray-500">{activeConversation?.user.role}</p>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
              {sampleMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg py-2 px-4 max-w-[80%] ${
                      message.isMine ? 'bg-tawsil-blue text-white' : 'bg-white border'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className={`text-xs mt-1 block text-right ${message.isMine ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input de message */}
            <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-500"
                onClick={() => document.getElementById("message-file")?.click()}
              >
                <Image className="h-5 w-5" />
                <input
                  id="message-file"
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              <Input
                placeholder="Écrivez votre message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-tawsil-blue hover:bg-tawsil-blue/90">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="contacts" className="flex-1 overflow-y-auto">
          <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-tawsil-blue text-white">
                    {i % 2 === 0 ? "AK" : "SB"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{i % 2 === 0 ? "Ahmed Kader" : "Samira Benchikh"}</h3>
                  <p className="text-sm text-gray-500">{i % 3 === 0 ? "Livreur" : i % 3 === 1 ? "Commerçant" : "Client"}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-tawsil-blue border-tawsil-blue"
                  >
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
