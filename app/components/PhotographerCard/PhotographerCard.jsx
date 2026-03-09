import Link from 'next/link';
import Image from 'next/image';
import './PhotographerCard.css';

export default function PhotographerCard({ photographer }) {
  return (
    <Link href={`/photographer/${photographer.id}`} aria-label={photographer.name}>
      <article className="card">
        <Image
          src={`/assets/${photographer.portrait}`}
          alt={photographer.name}
          width={200}
          height={200}
          className="card-image"
        />
        <h2>{photographer.name}</h2>
        <p className="card-city">{photographer.city}, {photographer.country}</p>
        <p className="card-tagline">{photographer.tagline}</p>
        <p className="card-price">{photographer.price}€/jour</p>
      </article>
    </Link>
  );
}