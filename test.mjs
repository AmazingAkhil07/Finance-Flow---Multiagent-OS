import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const all = await prisma.article.groupBy({
    by: ['category'],
    _count: true
  });
  console.log('Categories:', all);
  const sample = await prisma.article.findFirst();
  console.log('Sample:', sample);
}

check().catch(console.error).finally(() => prisma.$disconnect());
