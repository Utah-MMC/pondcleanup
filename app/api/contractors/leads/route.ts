import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || new URL(req.url).searchParams.get('token');

    if (!token) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const contractor = await prisma.contractor.findUnique({
      where: { id: token },
    });

    if (!contractor || !contractor.active) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const assignments = await prisma.contractorLead.findMany({
      where: { contractorId: contractor.id },
      include: {
        lead: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ ok: true, leads: assignments });
  } catch (error) {
    console.error('Contractor leads error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || new URL(req.url).searchParams.get('token');

    if (!token) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const contractor = await prisma.contractor.findUnique({
      where: { id: token },
    });

    if (!contractor || !contractor.active) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { assignmentId, status, notes } = await req.json();
    if (!assignmentId || !status) {
      return NextResponse.json({ ok: false, error: 'assignmentId and status required' }, { status: 400 });
    }

    // Verify this assignment belongs to this contractor
    const assignment = await prisma.contractorLead.findFirst({
      where: {
        id: assignmentId,
        contractorId: contractor.id,
      },
    });

    if (!assignment) {
      return NextResponse.json({ ok: false, error: 'Assignment not found' }, { status: 404 });
    }

    const updated = await prisma.contractorLead.update({
      where: { id: assignmentId },
      data: {
        status,
        notes: notes !== undefined ? notes : assignment.notes,
      },
      include: {
        lead: true,
      },
    });

    return NextResponse.json({ ok: true, assignment: updated });
  } catch (error) {
    console.error('Update lead status error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to update lead' }, { status: 500 });
  }
}

