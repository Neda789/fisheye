"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LikeButton from "../LikeButton/LikeButton";
import Filters from "../Filters/Filters";
import "./Lightbox.css";

// Composant principal — gère la galerie, le tri, les likes et la lightbox
export default function Lightbox({ medias }) {
  // État de la liste des médias triés (par défaut : ordre original)
  const [sortedMedias, setSortedMedias] = useState(medias);

  // Index du média actuellement ouvert dans la lightbox (null = fermée)
  const [currentIndex, setCurrentIndex] = useState(null);

  // Total des likes calculé à partir de tous les médias
  const [totalLikes, setTotalLikes] = useState(
    medias.reduce((sum, media) => sum + media.likes, 0),
  );

  // Ouvre la lightbox sur le média à l'index donné
  const openLightbox = (index) => setCurrentIndex(index);

  // Ferme la lightbox
  const closeLightbox = () => setCurrentIndex(null);

  // Passe au média suivant (boucle sur la liste)
  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % sortedMedias.length);

  // Passe au média précédent (boucle sur la liste)
  const goPrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + sortedMedias.length) % sortedMedias.length,
    );

  // Met à jour le total des likes lors d'un like/unlike
  const handleLikeChange = (change) => {
    setTotalLikes((prev) => prev + change);
  };

  // Navigation au clavier dans la lightbox (flèches + Échap)
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);

    // Nettoyage de l'écouteur au démontage du composant
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <>
      {/* Composant de filtrage — met à jour la liste triée via setSortedMedias */}
      <Filters medias={medias} onSort={setSortedMedias} />

      {/* Galerie de médias */}
      <section className="gallery" aria-label="Galerie photos">
        {sortedMedias.map((media, index) => (
          <div key={media.id} className="media-item">
            {/* Zone cliquable pour ouvrir la lightbox */}
            <div
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
              tabIndex={0}
              role="button"
              aria-label={`Ouvrir ${media.title}`}
            >
              {/* Affiche une image ou une vidéo selon le type de média */}
              {media.image ? (
                <Image
                  src={`/assets/${media.image}`}
                  alt={media.title}
                  width={310}
                  height={260}
                  className="media-image"
                />
              ) : (
                <video className="media-video" aria-label={media.title}>
                  <source src={`/assets/${media.video}`} />
                </video>
              )}
            </div>

            {/* Pied de carte : titre et bouton like */}
            <div className="media-footer">
              <p>{media.title}</p>
              <LikeButton
                mediaId={media.id}
                initialLikes={media.likes}
                onLikeChange={handleLikeChange}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Barre sticky en bas — affiche le total des likes et le tarif journalier */}
      <div
        className="sticky-bar"
        role="complementary"
        aria-label="Statistiques photographe"
      >
        <span>
          {totalLikes}
          <Image
            src="/assets/HartNoir.png"
            alt="likes"
            width={12}
            height={12}
          />
        </span>
        <span>{sortedMedias[0]?.price}€/jour</span>
      </div>

      {/* Lightbox — affichée uniquement si un média est sélectionné */}
      {currentIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${sortedMedias[currentIndex].title}`}
        >
          {/* Contenu de la lightbox — stopPropagation évite la fermeture au clic intérieur */}
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            {/* Bouton de fermeture */}
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Fermer la lightbox"
            >
              ✕
            </button>

            {/* Bouton précédent */}
            <button
              className="lightbox-prev"
              onClick={goPrev}
              aria-label="Image précédente"
            >
              ‹
            </button>

            {/* Affiche l'image ou la vidéo en grand format */}
            {sortedMedias[currentIndex].image ? (
              <Image
                src={`/assets/${sortedMedias[currentIndex].image}`}
                alt={sortedMedias[currentIndex].title}
                width={800}
                height={600}
                className="lightbox-media"
              />
            ) : (
              <video
                width={800}
                height={600}
                controls
                autoPlay
                aria-label={sortedMedias[currentIndex].title}
              >
                <source src={`/assets/${sortedMedias[currentIndex].video}`} />
              </video>
            )}

            {/* Bouton suivant */}
            <button
              className="lightbox-next"
              onClick={goNext}
              aria-label="Image suivante"
            >
              ›
            </button>

            {/* Titre du média affiché sous le contenu */}
            <p className="lightbox-title">{sortedMedias[currentIndex].title}</p>
          </div>
        </div>
      )}
    </>
  );
}
