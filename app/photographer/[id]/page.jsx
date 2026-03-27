import {
  getPhotographer,
  getAllMediasForPhotographer,
} from "../../lib/prisma-db";
import ContactModal from "../../components/ContactModal/ContactModal";
import Lightbox from "../../components/Lightbox/Lightbox";
import { notFound } from "next/navigation"; // <-- dodato za page error

// Composant de page pour afficher le profil d'un photographe
export default async function PhotographerPage({ params }) {
  // Récupère l'id passé dans les paramètres
  const { id: idParam } = await params;
  const id = parseInt(idParam);

  // Récupère les données du photographe depuis la base de données
  const photographer = await getPhotographer(id);

  // Ako fotograf ne postoji, prikaži 404 stranicu
  if (!photographer) {
    notFound(); // Next.js će prikazati 404
  }

  // Récupère tous les médias associés à ce photographe
  const medias = await getAllMediasForPhotographer(id);

  return (
    <main id="main-content">
      {/* Section avec les informations du photographe */}
      <section
        className="photographer-info"
        aria-label={`Profil de ${photographer.name}`}
      >
        <div className="photographer-info-text">
          {/* Nom du photographe */}
          <h2>{photographer.name}</h2>
          {/* Ville et pays */}
          <p className="city">
            {photographer.city}, {photographer.country}
          </p>
          {/* Slogan ou tagline */}
          <p>{photographer.tagline}</p>
        </div>

        {/* Bouton et modal de contact */}
        <ContactModal photographerName={photographer.name} />

        {/* Portrait du photographe — img utilisé car onError ne fonctionne pas dans les Server Components */}
        <img
          src={`/assets/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
          width={200}
          height={200}
          className="photographer-info-portrait"
        />
      </section>

      {/* Lightbox pour afficher les médias */}
      <Lightbox medias={medias} />
    </main>
  );
}