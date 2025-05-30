import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        variants: true,
      },
    });

    // Format the response to match what the frontend expects
    return NextResponse.json({
      products: products.map(product => ({
        ...product,
        imageUrl: product.imageUrl || `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`
      }))
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
} 