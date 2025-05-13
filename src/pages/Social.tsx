
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image } from "lucide-react";
import SocialPost from "@/components/social/SocialPost";

// Données fictives pour les posts
const samplePosts = [
  {
    id: "1",
    user: {
      name: "Ahmed Benali",
      role: "Superviseur",
      avatar: "",
    },
    content:
      "Félicitations à toute l'équipe pour le record de livraisons atteint hier! 💪 Continuons comme ça!",
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
      {
        id: "c2",
        user: {
          name: "Samira Mokhtar",
          avatar: "",
        },
        content: "Merci pour la reconnaissance! On continue sur cette lancée.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
      },
    ],
  },
  {
    id: "2",
    user: {
      name: "Leila Kaddour",
      role: "Responsable Logistique",
      avatar: "",
    },
    content:
      "Nous accueillons 5 nouveaux livreurs cette semaine! Bienvenue dans l'équipe Tawsil Star! 🚚✨",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 24,
    comments: [
      {
        id: "c3",
        user: {
          name: "Mohamed Salim",
          avatar: "",
        },
        content: "Bienvenue aux nouveaux collègues! 🙌",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      },
    ],
  },
  {
    id: "3",
    user: {
      name: "Omar Benmessaoud",
      role: "Directeur Général",
      avatar: "",
    },
    content:
      "Nous sommes fiers d'annoncer que nous avons dépassé les 10 000 livraisons ce mois-ci! Un grand merci à tous nos employés pour leur travail acharné et leur dévouement.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    likes: 47,
    comments: [],
  },
];

const Social = () => {
  const [posts, setPosts] = useState(samplePosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    // En situation réelle, ceci serait envoyé à une API
    const newPost = {
      id: `post-${Date.now()}`,
      user: {
        name: "Admin Utilisateur",
        role: "Superviseur",
        avatar: "",
      },
      content: newPostContent,
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      createdAt: new Date(),
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setSelectedImage(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Formulaire de création de post */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-tawsil-blue text-white">
              A
            </AvatarFallback>
          </Avatar>
          <form className="flex-1" onSubmit={handleSubmitPost}>
            <Textarea
              placeholder="Partagez une mise à jour avec l'équipe..."
              className="resize-none mb-3 min-h-[100px]"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            {selectedImage && (
              <div className="relative mb-3">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Aperçu"
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Image className="h-5 w-5 mr-1" />
                Photo
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedImage(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              <Button 
                type="submit"
                className="bg-tawsil-blue hover:bg-tawsil-blue/90"
                disabled={!newPostContent.trim()}
              >
                Publier
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Liste des posts */}
      <div>
        {posts.map((post) => (
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
      </div>
    </div>
  );
};

export default Social;
