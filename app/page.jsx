import { getAllPhotographers } from "./lib/prisma-db";
import PhotographerCard from "./components/PhotographerCard/PhotographerCard";

// Page d'accueil — composant serveur asynchrone
export default async function Home() {
  // Récupère la liste de tous les photographes depuis la base de données
  const photographers = await getAllPhotographers();

  return (
    <main id="main-content">
      {/* Grille de toutes les cartes photographes */}
      <section
        className="photographers-list"
        aria-label="Liste des photographes"
      >
        {photographers.map((photographer) => (
          // Carte individuelle pour chaque photographe — clé unique par id
          <PhotographerCard key={photographer.id} photographer={photographer} />
        ))}
      </section>
    </main>
  );
}
