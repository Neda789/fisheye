"use client";

import { useState } from "react";
import Image from "next/image";

// Composant bouton like — reçoit l'id du média, le nombre initial de likes et un callback parent
export default function LikeButton({ mediaId, initialLikes, onLikeChange }) {
  // État du nombre de likes affiché
  const [likes, setLikes] = useState(initialLikes);

  // État pour savoir si l'utilisateur a déjà liké ce média
  const [liked, setLiked] = useState(false);

  // Gestion du clic sur le bouton like/unlike
  const handleLike = async () => {
    const change = liked ? -1 : 1; // +1 si like, -1 si unlike
    const newLikes = likes + change;

    setLikes(newLikes); // Met à jour l'affichage local
    setLiked(!liked); // Inverse l'état liked
    onLikeChange(change); // Informe le composant parent du changement

    // Envoie la mise à jour au serveur via l'API
    await fetch(`/api/likes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mediaId, likes: newLikes }),
    });
  };

  return (
    // Bouton accessible avec aria-label indiquant le nombre de likes
    <button
      className="like-btn"
      onClick={handleLike}
      aria-label={`${likes} likes`}
    >
      {likes}
      {/* Icône cœur */}
      <Image src="/assets/Hart.png" alt="like" width={12} height={12} />
    </button>
  );
}
