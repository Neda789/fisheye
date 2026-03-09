import { getPhotographer, getAllMediasForPhotographer } from '../../lib/prisma-db';
import Image from 'next/image';
import ContactModal from '../../components/ContactModal/ContactModal';
import Lightbox from '../../components/Lightbox/Lightbox';

export default async function PhotographerPage({ params }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);
  const photographer = await getPhotographer(id);
  const medias = await getAllMediasForPhotographer(id);

  return (
    <main>
      <section className="photographer-info">
  <div className="photographer-info-text">
    <h2>{photographer.name}</h2>
    <p className='city'>{photographer.city}, {photographer.country}</p>
    <p>{photographer.tagline}</p>
  </div>
  <ContactModal photographerName={photographer.name} />
  <Image
    src={`/assets/${photographer.portrait}`}
    alt={photographer.name}
    width={200}
    height={200}
    className="photographer-info-portrait"
  />
</section>

      <Lightbox medias={medias} />
    </main>
  );
}