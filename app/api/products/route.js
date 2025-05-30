import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 