import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Create Mailtrap transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      address,
      city,
      country,
      postalCode,
      variantId,
      quantity,
      price,
    } = body;

    // Create the order
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        address,
        city,
        country,
        postalCode,
        total: price * quantity,
        items: {
          create: [
            {
              quantity,
              price,
              variant: {
                connect: {
                  id: variantId,
                },
              },
            },
          ],
        },
      },
      include: {
        items: {
          include: {
            variant: true,
          },
        },
      },
    });

    // Update inventory
    await prisma.variant.update({
      where: {
        id: variantId,
      },
      data: {
        inventory: {
          decrement: quantity,
        },
      },
    });

    // Send confirmation email

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
} 