const { PrismaClient } = require('@prisma/client');
const photographers = require('../data/photographer.json');
const medias = require('../data/media.json');

const prisma = new PrismaClient();

async function main() {
    await prisma.photographer.createMany({
        data: photographers
    });

    await prisma.media.createMany({
        data: medias
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });