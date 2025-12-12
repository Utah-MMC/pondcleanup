import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdminToken } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const authResult = await requireAdminToken(req);
  if (authResult && 'response' in authResult) return authResult.response;

  try {
    const [leads, orders, products] = await Promise.all([
      prisma.lead.count(),
      prisma.order.count(),
      prisma.product.count(),
    ]);

    const recentLeads = await prisma.lead.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        location: true,
        service: true,
        source: true,
        createdAt: true,
      },
    });

    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, slug: true },
            },
          },
        },
      },
    });

    const productStats = await prisma.product.groupBy({
      by: ['active'],
      _count: true,
    });

    const orderStats = await prisma.order.groupBy({
      by: ['status'],
      _count: true,
      _sum: {
        totalCents: true,
      },
    });

    return NextResponse.json({
      ok: true,
      stats: {
        leads: { total: leads },
        orders: { total: orders },
        products: { total: products },
        productsByStatus: productStats.reduce(
          (acc, s) => ({ ...acc, [s.active ? 'active' : 'inactive']: s._count }),
          {} as Record<string, number>,
        ),
        ordersByStatus: orderStats.reduce(
          (acc, s) => ({
            ...acc,
            [s.status]: { count: s._count, revenueCents: s._sum.totalCents || 0 },
          }),
          {} as Record<string, { count: number; revenueCents: number }>,
        ),
      },
      recentLeads,
      recentOrders,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}

