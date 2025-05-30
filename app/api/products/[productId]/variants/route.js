import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const productId = await context.params.productId;

    const variants = await prisma.variant.findMany({
      where: {
        productId: productId,
      },
      orderBy: {
        price: 'asc',
      },
    });

    return NextResponse.json({ variants });
  } catch (error) {
    console.error('Failed to fetch variants:', error);
    return NextResponse.json(
      { message: 'Failed to fetch variants' },
      { status: 500 }
    );
  }
} 