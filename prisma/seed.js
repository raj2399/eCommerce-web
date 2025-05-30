const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create products with variants
  const products = [
    {
      name: 'Nike Air Zoom',
      description: 'Premium running shoes with advanced cushioning',
      price: 129.99,
      imageUrl: 'https://placehold.co/400x300?text=Nike+Air+Zoom',
      variants: {
        create: [
          {
            name: 'Black/Size 9',
            sku: 'NIKE-AIR-9-BLK',
            price: 129.99,
            inventory: 10
          },
          {
            name: 'White/Size 10',
            sku: 'NIKE-AIR-10-WHT',
            price: 129.99,
            inventory: 8
          }
        ]
      }
    },
    {
      name: 'Adidas Ultraboost',
      description: 'High-performance running shoes with energy return',
      price: 179.99,
      imageUrl: 'https://placehold.co/400x300?text=Adidas+Ultraboost',
      variants: {
        create: [
          {
            name: 'Black/Size 9',
            sku: 'ADI-ULTRA-9-BLK',
            price: 179.99,
            inventory: 12
          },
          {
            name: 'White/Size 10',
            sku: 'ADI-ULTRA-10-WHT',
            price: 179.99,
            inventory: 6
          }
        ]
      }
    },
    {
      name: 'Samsung 4K Smart TV',
      description: '55-inch 4K Ultra HD Smart LED TV',
      price: 699.99,
      imageUrl: 'https://placehold.co/400x300?text=Samsung+TV',
      variants: {
        create: [
          {
            name: '55-inch',
            sku: 'SAM-TV-55',
            price: 699.99,
            inventory: 5
          }
        ]
      }
    },
    {
      name: 'LG OLED TV',
      description: '65-inch OLED 4K Smart TV',
      price: 1299.99,
      imageUrl: 'https://placehold.co/400x300?text=LG+OLED',
      variants: {
        create: [
          {
            name: '65-inch',
            sku: 'LG-OLED-65',
            price: 1299.99,
            inventory: 3
          }
        ]
      }
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Database has been seeded! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 