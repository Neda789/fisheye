import Link from "next/link";
import Image from "next/image";
import "./PhotographerCard.css";

// Composant carte photographe — reçoit les données d'un photographe en prop
export default function PhotographerCard({ photographer }) {
  return (
    // Lien vers la page de détail du photographe — accessible via aria-label
    <Link
      href={`/photographer/${photographer.id}`}
      aria-label={`${photographer.name}, photographe basé à ${photographer.city}`}
    >
      <article className="card" role="article">
        {/* Portrait du photographe */}
        <Image
          src={`/assets/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
          width={200}
          height={200}
          className="card-image"
        />

        {/* Nom du photographe */}
        <h2>{photographer.name}</h2>

        {/* Ville et pays */}
        <p className="card-city">
          {photographer.city}, {photographer.country}
        </p>

        {/* Slogan du photographe */}
        <p className="card-tagline">{photographer.tagline}</p>

        {/* Tarif journalier */}
        <p className="card-price">{photographer.price}€/jour</p>
      </article>
    </Link>
  );
}
