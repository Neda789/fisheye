"use client";

import Link from "next/link";
import Image from "next/image";
import "./PhotographerCard.css";

// Composant pour afficher la carte d'un photographe
export default function PhotographerCard({ photographer }) {
  return (
    // Lien vers la page du photographe
    <Link
      href={`/photographer/${photographer.id}`}
      className="card" // Classe sur le Link pour permettre la navigation au clavier
      aria-label={`${photographer.name}, photographe basé à ${photographer.city}`}
    >
      <article role="article">
        {/* Image du portrait */}
        <Image
          src={`/assets/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
          width={200}
          height={200}
          className="card-image"
          onError={(e) => {
            console.error("Erreur chargement portrait:", e);
            e.currentTarget.src = "/assets/placeholder.png"; // Placeholder en cas d'erreur
          }}
        />
        {/* Nom du photographe */}
        <h2>{photographer.name}</h2>
        {/* Ville et pays */}
        <p className="card-city">
          {photographer.city}, {photographer.country}
        </p>
        {/* Phrase d'accroche */}
        <p className="card-tagline">{photographer.tagline}</p>
        {/* Prix */}
        <p className="card-price">{photographer.price}€/jour</p>
      </article>
    </Link>
  );
}
