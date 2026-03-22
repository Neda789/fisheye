"use client";

import { useState } from "react";
import Image from "next/image";

// Bouton Like avec compteur et toggle
export default function LikeButton({ mediaId, initialLikes, onLikeChange }) {
  const [likes, setLikes] = useState(initialLikes); // État du nombre de likes
  const [liked, setLiked] = useState(false); // État du toggle Like

  // Gestion du clic sur le bouton Like
  const handleLike = async () => {
    const change = liked ? -1 : 1; // +1 si like, -1 si unlike
    const newLikes = likes + change;

    // Mise à jour optimiste côté client
    setLikes(newLikes);
    setLiked(!liked);
    onLikeChange(change); // Notifie le parent

    try {
      // Appel API pour sauvegarder le changement dans la base
      const response = await fetch(`/api/likes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId, change }),
      });

      if (!response.ok)
        throw new Error("Erreur serveur lors de la mise à jour des likes.");
    } catch (error) {
      // Rollback en cas d'erreur
      setLikes(likes);
      setLiked(liked);
      onLikeChange(-change);
      console.error(error);
      alert("Une erreur est survenue. Merci de réessayer !");
    }
  };

  return (
    <button
      className="like-btn"
      onClick={handleLike}
      aria-label={`${likes} likes`} // Description pour lecteurs d'écran
      aria-pressed={liked} // Indique si le bouton est actif
    >
      {likes}
      <Image src="/assets/Hart.png" alt="like" width={12} height={12} />
    </button>
  );
}
