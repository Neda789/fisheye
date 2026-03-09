'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LikeButton({ mediaId, initialLikes, onLikeChange }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const change = liked ? -1 : 1;
    const newLikes = likes + change;
    setLikes(newLikes);
    setLiked(!liked);
    onLikeChange(change);

    await fetch(`/api/likes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaId, likes: newLikes }),
    });
  };

  return (
    <button 
      className="like-btn" 
      onClick={handleLike}
      aria-label={`${likes} likes`}
    >
      {likes} 
      <Image src="/assets/Hart.png" alt="like" width={12} height={12} />
    </button>
  );
}