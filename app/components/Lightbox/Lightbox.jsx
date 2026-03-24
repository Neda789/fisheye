"use client";

import { useState, useEffect } from "react";
import LikeButton from "../LikeButton/LikeButton";
import Filters from "../Filters/Filters";
import "./Lightbox.css";

/**
 * Composant Lightbox pour afficher la galerie et gérer le tri ainsi que le modal
 */
export default function Lightbox({ medias }) {
  // --- ÉTATS PRINCIPAUX (States) ---
  // État pour les médias triés, l'index actuel du modal et le total des likes
  const [sortedMedias, setSortedMedias] = useState(medias);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [totalLikes, setTotalLikes] = useState(
    medias.reduce((sum, media) => sum + media.likes, 0),
  );
  const [errorMessage, setErrorMessage] = useState("");

  // --- ACTIONS DU MODAL ---
  // Fonctions pour ouvrir et fermer la vue agrandie (lightbox)
  const openLightbox = (index) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  // --- GESTION DES LIKES ---
  // Met à jour le compteur global situé dans la barre collante (sticky-bar)
  const handleLikeChange = (change) => {
    setTotalLikes((prev) => prev + change);
  };

  // --- ACCESSIBILITÉ CLAVIER (GALLERIE) ---
  // Gère la navigation entre les éléments de la galerie avec les flèches et la touche Entrée
  useEffect(() => {
    const buttons = document.querySelectorAll(".media-btn");

    const handleKeyDown = (e) => {
      const items = [...document.querySelectorAll(".media-btn")];
      const idx = items.indexOf(e.currentTarget);

      if (e.key === "Enter") {
        e.preventDefault();
        openLightbox(idx);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (idx < items.length - 1) items[idx + 1].focus();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (idx > 0) items[idx - 1].focus();
      }
    };

    buttons.forEach((btn) => {
      btn.addEventListener("keydown", handleKeyDown);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, [sortedMedias]);

  // --- NAVIGATION CLAVIER (LIGHTBOX) ---
  // Gère le défilement des images et la fermeture avec 'Escape' une fois le modal ouvert
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight")
        setCurrentIndex((prev) => (prev + 1) % sortedMedias.length);
      if (e.key === "ArrowLeft")
        setCurrentIndex(
          (prev) => (prev - 1 + sortedMedias.length) % sortedMedias.length,
        );
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, sortedMedias.length]);

  return (
    <>
      {/* Composant de filtrage qui renvoie les médias triés */}
      <Filters medias={medias} onSort={setSortedMedias} />

      {/* Section principale de la galerie d'images et vidéos */}
      <section className="gallery" aria-label="Galerie photos">
        {sortedMedias.map((media, index) => (
          <div key={media.id} className="media-item">
            <button
              className="media-btn"
              onClick={() => openLightbox(index)}
              aria-label={`Ouvrir ${media.title}`}
            >
              {media.image ? (
                <img
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
            </button>

            {/* Pied de page du média avec titre et bouton like */}
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

      {/* Affichage des erreurs si nécessaire */}
      {errorMessage && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Barre d'information fixe : total des likes et prix journalier */}
      <div
        className="sticky-bar"
        role="complementary"
        aria-label="Statistiques photographe"
      >
        <span>
          {totalLikes}
          <img src="/assets/HartNoir.png" alt="likes" width={12} height={12} />
        </span>
        <span>{sortedMedias[0]?.price}€/jour</span>
      </div>

      {/* Structure du modal Lightbox (uniquement si currentIndex est défini) */}
      {currentIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Fermer la modale"
            >
              ✕
            </button>
            <button
              className="lightbox-prev"
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + sortedMedias.length) % sortedMedias.length,
                )
              }
            >
              ‹
            </button>

            <div className="lightbox-content">
              {sortedMedias[currentIndex].image ? (
                <img
                  src={`/assets/${sortedMedias[currentIndex].image}`}
                  alt=""
                  className="lightbox-media"
                />
              ) : (
                <video width={800} height={600} controls autoPlay>
                  <source src={`/assets/${sortedMedias[currentIndex].video}`} />
                </video>
              )}
            </div>

            <button
              className="lightbox-next"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % sortedMedias.length)
              }
            >
              ›
            </button>
            <p className="lightbox-title">{sortedMedias[currentIndex].title}</p>
          </div>
        </div>
      )}
    </>
  );
}
