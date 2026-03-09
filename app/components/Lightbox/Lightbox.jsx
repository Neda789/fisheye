'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LikeButton from '../LikeButton/LikeButton';
import Filters from '../Filters/Filters';
import './Lightbox.css';

export default function Lightbox({ medias }) {
  const [sortedMedias, setSortedMedias] = useState(medias);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [totalLikes, setTotalLikes] = useState(
    medias.reduce((sum, media) => sum + media.likes, 0)
  );

  const openLightbox = (index) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % sortedMedias.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + sortedMedias.length) % sortedMedias.length);

  const handleLikeChange = (change) => {
    setTotalLikes((prev) => prev + change);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex]);

  return (
    <>
      <Filters medias={medias} onSort={setSortedMedias} />

      <section className="gallery">
        {sortedMedias.map((media, index) => (
          <div key={media.id} className="media-item">
            <div onClick={() => openLightbox(index)}>
              {media.image ? (
                <Image
                  src={`/assets/${media.image}`}
                  alt={media.title}
                  width={310}
                  height={260}
                  className="media-image"
                />
              ) : (
                <video className="media-video">
                  <source src={`/assets/${media.video}`} />
                </video>
              )}
            </div>
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

      <div className="sticky-bar">
        <span>{totalLikes} 
          <Image src="/assets/HartNoir.png" alt="likes" width={12} height={12} />
        </span>
        <span>{sortedMedias[0]?.price}€/jour</span>
      </div>

      {currentIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Fermer">✕</button>
            <button className="lightbox-prev" onClick={goPrev} aria-label="Précédent">‹</button>

            {sortedMedias[currentIndex].image ? (
              <Image
                src={`/assets/${sortedMedias[currentIndex].image}`}
                alt={sortedMedias[currentIndex].title}
                width={800}
                height={600}
                className="lightbox-media"
              />
            ) : (
              <video width={800} height={600} controls autoPlay>
                <source src={`/assets/${sortedMedias[currentIndex].video}`} />
              </video>
            )}

            <button className="lightbox-next" onClick={goNext} aria-label="Suivant">›</button>
            <p className="lightbox-title">{sortedMedias[currentIndex].title}</p>
          </div>
        </div>
      )}
    </>
  );
}