import { PrismaClient } from "@prisma/client";

// Initialisation du client Prisma pour interagir avec la base de données
const prisma = new PrismaClient();

// Récupère la liste de tous les photographes
export const getAllPhotographers = () => prisma.photographer.findMany();

// Récupère un photographe unique par son identifiant
export const getPhotographer = (id) =>
  prisma.photographer.findUnique({
    where: { id },
  });

// Récupère tous les médias associés à un photographe donné
export const getAllMediasForPhotographer = (photographerId) =>
  prisma.media.findMany({
    where: { photographerId },
  });

// Met à jour le nombre de likes d'un média spécifique (ajout ou retrait)
export const updateNumberOfLikes = (mediaId, change) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: { increment: change } }, // +1 ou -1
  });
