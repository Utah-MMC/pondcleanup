import { prisma } from '@/lib/db';

export async function listActiveProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getActiveProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug, active: true },
  });
}


