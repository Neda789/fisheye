import {
  getPhotographer,
  getAllMediasForPhotographer,
} from "../../lib/prisma-db";
import Image from "next/image";
import ContactModal from "../../components/ContactModal/ContactModal";
import Lightbox from "../../components/Lightbox/Lightbox";

// Page de détail d'un photographe — composant serveur asynchrone
export default async function PhotographerPage({ params }) {
  // Récupère l'identifiant depuis les paramètres de l'URL et le convertit en entier
  const { id: idParam } = await params;
  const id = parseInt(idParam);

  // Récupère les données du photographe et de ses médias depuis la base de données
  const photographer = await getPhotographer(id);
  const medias = await getAllMediasForPhotographer(id);

  return (
    <main id="main-content">
      {/* Section d'en-tête avec les informations du photographe */}
      <section
        className="photographer-info"
        aria-label={`Profil de ${photographer.name}`}
      >
        {/* Texte : nom, ville et slogan */}
        <div className="photographer-info-text">
          <h2>{photographer.name}</h2>
          <p className="city">
            {photographer.city}, {photographer.country}
          </p>
          <p>{photographer.tagline}</p>
        </div>

        {/* Modale de contact — reçoit le nom du photographe */}
        <ContactModal photographerName={photographer.name} />

        {/* Portrait du photographe */}
        <Image
          src={`/assets/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
          width={200}
          height={200}
          className="photographer-info-portrait"
        />
      </section>

      {/* Galerie de médias avec lightbox et filtres */}
      <Lightbox medias={medias} />
    </main>
  );
}
