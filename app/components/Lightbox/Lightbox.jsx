"use client";

import { useState, useEffect, useRef } from "react";
import LikeButton from "../LikeButton/LikeButton";
import Filters from "../Filters/Filters";
import "./Lightbox.css";

// Composant Lightbox pour afficher les médias d'un photographe
export default function Lightbox({ medias }) {
  // États principaux
  const [sortedMedias, setSortedMedias] = useState(medias); // Médias triés
  const [currentIndex, setCurrentIndex] = useState(null); // Index du média affiché dans la lightbox
  const [totalLikes, setTotalLikes] = useState(
    medias.reduce((sum, media) => sum + media.likes, 0),
  ); // Total de likes
  const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur pour média non chargé

  // Ouvrir et fermer la lightbox
  const openLightbox = (index) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  // Gestion des likes
  const handleLikeChange = (change) => {
    setTotalLikes((prev) => prev + change);
  };

  // Ajoute focus/blur et gestion clavier sur les boutons médias (accessibilité)
  useEffect(() => {
    const buttons = document.querySelectorAll(".media-btn");

    const handleFocus = (e) => {
      const img = e.currentTarget.querySelector("img, video");
      if (img) {
        img.style.boxShadow = "0 0 0 5px #901c1c";
        img.style.outline = "3px solid #fff";
        img.style.outlineOffset = "-3px";
      }
    };

    const handleBlur = (e) => {
      const img = e.currentTarget.querySelector("img, video");
      if (img) {
        img.style.boxShadow = "";
        img.style.outline = "";
        img.style.outlineOffset = "";
      }
    };

    const handleKeyDown = (e) => {
      const items = [...document.querySelectorAll(".media-btn")];
      const idx = items.indexOf(e.currentTarget);
      if (e.key === "Enter") openLightbox(idx);
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
      btn.addEventListener("focus", handleFocus);
      btn.addEventListener("blur", handleBlur);
      btn.addEventListener("keydown", handleKeyDown);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("focus", handleFocus);
        btn.removeEventListener("blur", handleBlur);
        btn.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, [sortedMedias]);

  // Navigation clavier pour la lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight")
        setCurrentIndex((prev) => (prev + 1) % sortedMedias.length);
      if (e.key === "ArrowLeft")
        setCurrentIndex(
          (prev) => (prev - 1 + sortedMedias.length) % sortedMedias.length,
        );
      if (e.key === "Escape") setCurrentIndex(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, sortedMedias.length]);

  return (
    <>
      {/* Composant pour trier/filtrer les médias */}
      <Filters medias={medias} onSort={setSortedMedias} />

      {/* Galerie de médias */}
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
                  onError={(e) => {
                    e.currentTarget.src = "/assets/placeholder.png";
                    setErrorMessage(
                      `Impossible de charger l'image ${media.title}`,
                    );
                  }}
                />
              ) : (
                <video
                  className="media-video"
                  aria-label={media.title}
                  onError={() =>
                    setErrorMessage(
                      `Impossible de charger la vidéo ${media.title}`,
                    )
                  }
                >
                  <source src={`/assets/${media.video}`} />
                </video>
              )}
            </button>

            {/* Footer média avec titre et bouton like */}
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

      {/* Message d'erreur */}
      {errorMessage && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Barre sticky avec total likes et prix */}
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

      {/* Lightbox overlay */}
      {currentIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${sortedMedias[currentIndex].title}`}
        >
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            {/* Bouton fermeture */}
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Fermer la lightbox"
            >
              ✕
            </button>

            {/* Navigation précédente */}
            <button
              className="lightbox-prev"
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + sortedMedias.length) % sortedMedias.length,
                )
              }
              aria-label="Image précédente"
            >
              ‹
            </button>

            {/* Média affiché */}
            {sortedMedias[currentIndex].image ? (
              <img
                src={`/assets/${sortedMedias[currentIndex].image}`}
                alt={sortedMedias[currentIndex].title}
                width={800}
                height={600}
                className="lightbox-media"
                onError={(e) => {
                  e.currentTarget.src = "/assets/placeholder.png";
                  setErrorMessage(
                    `Impossible de charger l'image ${sortedMedias[currentIndex].title}`,
                  );
                }}
              />
            ) : (
              <video
                width={800}
                height={600}
                controls
                autoPlay
                aria-label={sortedMedias[currentIndex].title}
                onError={() =>
                  setErrorMessage(
                    `Impossible de charger la vidéo ${sortedMedias[currentIndex].title}`,
                  )
                }
              >
                <source src={`/assets/${sortedMedias[currentIndex].video}`} />
              </video>
            )}

            {/* Navigation suivante */}
            <button
              className="lightbox-next"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % sortedMedias.length)
              }
              aria-label="Image suivante"
            >
              ›
            </button>

            {/* Titre du média */}
            <p className="lightbox-title">{sortedMedias[currentIndex].title}</p>
          </div>
        </div>
      )}
    </>
  );
}
