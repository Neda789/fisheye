"use client";

import { useState, useEffect, useRef } from "react";
import LikeButton from "../LikeButton/LikeButton";
import Filters from "../Filters/Filters";
import "./Lightbox.css";

/**
 * Composant Lightbox pour afficher la galerie et gérer le tri ainsi que le modal
 */
export default function Lightbox({ medias }) {
  // --- ÉTATS PRINCIPAUX (States) ---
  const [sortedMedias, setSortedMedias] = useState(medias);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [totalLikes, setTotalLikes] = useState(
    medias.reduce((sum, media) => sum + media.likes, 0),
  );
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ REF za modal
  const lightboxRef = useRef(null);

  // --- ACTIONS DU MODAL ---
  const openLightbox = (index) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  // --- GESTION DES LIKES ---
  const handleLikeChange = (change) => {
    setTotalLikes((prev) => prev + change);
  };

  // --- ACCESSIBILITÉ CLAVIER (GALLERIE) ---
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

  // ✅ FOCUS TRAP
  useEffect(() => {
    if (currentIndex === null || !lightboxRef.current) return;

    const focusable = lightboxRef.current.querySelectorAll(
      "button, img, video"
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    lightboxRef.current.focus();

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [currentIndex]);

  return (
    <>
      <Filters medias={medias} onSort={setSortedMedias} />

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

      {errorMessage && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}

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

      {currentIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox"
            ref={lightboxRef}
            tabIndex="0"
            onClick={(e) => e.stopPropagation()}
          >
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
                  alt={sortedMedias[currentIndex].title} // ✅ FIX
                  className="lightbox-media"
                />
              ) : (
                <video width={800} height={600} controls autoPlay>
                  <source
                    src={`/assets/${sortedMedias[currentIndex].video}`}
                  />
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

            <p className="lightbox-title">
              {sortedMedias[currentIndex].title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}