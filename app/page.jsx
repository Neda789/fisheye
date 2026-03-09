import { getAllPhotographers } from './lib/prisma-db';
import PhotographerCard from './components/PhotographerCard/PhotographerCard';


export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <main>
     

      <section className="photographers-list" aria-label="Liste des photographes">
        {photographers.map((photographer) => (
          <PhotographerCard key={photographer.id} photographer={photographer} />
        ))}
      </section>
    </main>
  );
}