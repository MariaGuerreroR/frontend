import React, { useState } from 'react';
import axios from 'axios';
import { BlogPost as BlogPostType } from '../types';
import { AnimatedCharacter } from './AnimatedCharacter';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface BlogPostProps {
  post: BlogPostType;
  characterImage: string;
  index: number;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, characterImage, index }) => {
  const isEven = index % 2 === 0;
  const characterPosition = isEven ? 'right' : 'left';

  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(post.userId)); // Puedes cambiar esto según lógica real
  const [animating, setAnimating] = useState(false);

  const handleLike = async () => {
    try {
      setAnimating(true);
      setLiked(!liked);

      const res = await axios.post(
        `/api/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setLikes(res.data.likesCount);
      setTimeout(() => setAnimating(false), 300); // Duración de la animación
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  return (
    <article className="relative mb-8 sm:mb-16 max-w-6xl mx-auto transition-all duration-300">
      {/* ...contenido anterior... */}

      {/* Botón de like al final del post */}
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 border-2 border-black rounded-full px-4 py-2 font-medium transition-all duration-300 
            ${liked ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} 
            ${animating ? 'scale-110' : 'scale-100'}`}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          {likes}
        </button>
      </div>
    </article>
  );
};
