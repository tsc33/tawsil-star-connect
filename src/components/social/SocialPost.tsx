
import React, { useState } from "react";
import { User, Star, Share, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type Comment = {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
};

type SocialPostProps = {
  id: string;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
};

const SocialPost: React.FC<SocialPostProps> = ({
  user,
  content,
  image,
  createdAt,
  likes,
  comments,
  isLiked: initialIsLiked = false,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // En situation réelle, envoyer vers une API
    console.log("New comment:", newComment);
    setNewComment("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-tawsil-blue text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.role} • {formatDistanceToNow(createdAt, { addSuffix: true, locale: fr })}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-gray-700">{content}</p>
        </div>
        {image && (
          <div className="mt-3">
            <img
              src={image}
              alt="Post"
              className="w-full h-auto rounded-md object-cover max-h-80"
            />
          </div>
        )}
        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <div className="flex space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? "text-tawsil-yellow" : "text-gray-500"} hover:text-tawsil-yellow transition-colors`}
            >
              <Star className={`h-5 w-5 ${isLiked ? "fill-tawsil-yellow" : ""}`} />
              <span className="text-sm">{likeCount}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-500 hover:text-tawsil-blue transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">{comments.length}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-tawsil-blue transition-colors">
            <Share className="h-5 w-5" />
          </button>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-tawsil-blue/20 text-tawsil-blue text-xs">
                    {comment.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-gray-50 rounded-md p-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">{comment.user.name}</h4>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: fr })}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}

            <form onSubmit={handleSubmitComment} className="flex items-center space-x-3 mt-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-tawsil-blue text-white text-xs">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Écrivez un commentaire..."
                  className="w-full border border-gray-200 rounded-full py-2 px-4 text-sm"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim()}
                className="rounded-full bg-tawsil-blue hover:bg-tawsil-blue/90"
              >
                Envoyer
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialPost;
