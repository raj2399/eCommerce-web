const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  {
    name: 'Premium 4K Smart TV',
    description: 'Ultra HD Smart TV with HDR and AI upscaling',
    price: 999.99,
    imageUrl: '/images/tv1.jpg',
    variants: [
      { name: '55-inch', sku: 'TV-55', price: 999.99, inventory: 30 },
      { name: '65-inch', sku: 'TV-65', price: 1299.99, inventory: 20 },
      { name: '75-inch', sku: 'TV-75', price: 1799.99, inventory: 15 }
    ]
  },
  {
    name: 'OLED Gaming TV',
    description: 'Perfect for gaming with 120Hz refresh rate',
    price: 1499.99,
    imageUrl: '/images/tv2.jpg',
    variants: [
      { name: '48-inch', sku: 'OLED-48', price: 1499.99, inventory: 25 },
      { name: '55-inch', sku: 'OLED-55', price: 1799.99, inventory: 20 },
      { name: '65-inch', sku: 'OLED-65', price: 2299.99, inventory: 15 }
    ]
  },
  {
    name: 'Running Shoes Pro',
    description: 'Professional running shoes with advanced cushioning',
    price: 129.99,
    imageUrl: '/images/shoe1.jpg',
    variants: [
      { name: 'Size 8', sku: 'RUN-8', price: 129.99, inventory: 50 },
      { name: 'Size 9', sku: 'RUN-9', price: 129.99, inventory: 50 },
      { name: 'Size 10', sku: 'RUN-10', price: 129.99, inventory: 50 }
    ]
  },
  {
    name: 'Trail Running Shoes',
    description: 'All-terrain running shoes with water resistance',
    price: 149.99,
    imageUrl: '/images/shoe2.jpg',
    variants: [
      { name: 'Size 8', sku: 'TRAIL-8', price: 149.99, inventory: 40 },
      { name: 'Size 9', sku: 'TRAIL-9', price: 149.99, inventory: 40 },
      { name: 'Size 10', sku: 'TRAIL-10', price: 149.99, inventory: 40 }
    ]
  },
  {
    name: 'TaskBRB Premium Package',
    description: 'Boost your productivity with our premium task management solution',
    price: 99.99,
    imageUrl: '/images/product-premium.jpg',
    variants: [
      { name: 'Basic', sku: 'TBR-BASIC', price: 99.99, inventory: 50 },
      { name: 'Pro', sku: 'TBR-PRO', price: 149.99, inventory: 30 },
      { name: 'Enterprise', sku: 'TBR-ENT', price: 299.99, inventory: 20 }
    ]
  },
  {
    name: 'Gaming Laptop Pro',
    description: 'High-performance gaming laptop with RTX 4080',
    price: 1999.99,
    imageUrl: 'https://placehold.co/400x300?text=Gaming+Laptop',
    variants: [
      { name: 'RTX 4070', sku: 'GL-4070', price: 1999.99, inventory: 20 },
      { name: 'RTX 4080', sku: 'GL-4080', price: 2499.99, inventory: 15 },
      { name: 'RTX 4090', sku: 'GL-4090', price: 2999.99, inventory: 10 }
    ]
  },
  {
    name: 'Ultrabook Slim',
    description: 'Ultra-portable laptop for professionals',
    price: 1299.99,
    imageUrl: 'https://placehold.co/400x300?text=Ultrabook',
    variants: [
      { name: '13-inch', sku: 'UB-13', price: 1299.99, inventory: 30 },
      { name: '15-inch', sku: 'UB-15', price: 1499.99, inventory: 25 },
      { name: '17-inch', sku: 'UB-17', price: 1699.99, inventory: 20 }
    ]
  },
  {
    name: 'Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with noise cancellation',
    price: 199.99,
    imageUrl: 'https://placehold.co/400x300?text=Wireless+Earbuds',
    variants: [
      { name: 'White', sku: 'WE-WHITE', price: 199.99, inventory: 100 },
      { name: 'Black', sku: 'WE-BLACK', price: 199.99, inventory: 100 },
      { name: 'Rose Gold', sku: 'WE-ROSE', price: 219.99, inventory: 50 }
    ]
  },
  {
    name: 'Smart Watch Elite',
    description: 'Advanced smartwatch with health monitoring',
    price: 299.99,
    imageUrl: 'https://placehold.co/400x300?text=Smart+Watch',
    variants: [
      { name: '41mm', sku: 'SW-41', price: 299.99, inventory: 50 },
      { name: '45mm', sku: 'SW-45', price: 329.99, inventory: 50 }
    ]
  },
  {
    name: 'Professional Camera',
    description: 'Full-frame mirrorless camera for professionals',
    price: 2499.99,
    imageUrl: 'https://placehold.co/400x300?text=Pro+Camera',
    variants: [
      { name: 'Body Only', sku: 'CAM-BODY', price: 2499.99, inventory: 20 },
      { name: 'Kit Lens Bundle', sku: 'CAM-KIT', price: 2999.99, inventory: 15 }
    ]
  },
  {
    name: 'Gaming Console X',
    description: 'Next-gen gaming console with 4K graphics',
    price: 499.99,
    imageUrl: 'https://placehold.co/400x300?text=Gaming+Console',
    variants: [
      { name: 'Digital Edition', sku: 'GC-DIGITAL', price: 499.99, inventory: 50 },
      { name: 'Disc Edition', sku: 'GC-DISC', price: 599.99, inventory: 40 }
    ]
  },
  {
    name: 'Smart Home Hub',
    description: 'Central control for your smart home devices',
    price: 149.99,
    imageUrl: 'https://placehold.co/400x300?text=Smart+Hub',
    variants: [
      { name: 'Standard', sku: 'HUB-STD', price: 149.99, inventory: 100 },
      { name: 'Pro', sku: 'HUB-PRO', price: 199.99, inventory: 75 }
    ]
  },
  {
    name: 'Wireless Speaker System',
    description: 'Premium wireless speakers with room calibration',
    price: 699.99,
    imageUrl: 'https://placehold.co/400x300?text=Speaker+System',
    variants: [
      { name: 'Single Speaker', sku: 'SPK-1', price: 699.99, inventory: 30 },
      { name: 'Stereo Pair', sku: 'SPK-2', price: 1299.99, inventory: 20 }
    ]
  },
  {
    name: 'Electric Scooter',
    description: 'Foldable electric scooter with long range',
    price: 599.99,
    imageUrl: 'https://placehold.co/400x300?text=E-Scooter',
    variants: [
      { name: 'Standard Range', sku: 'SCOOT-STD', price: 599.99, inventory: 40 },
      { name: 'Extended Range', sku: 'SCOOT-EXT', price: 799.99, inventory: 30 }
    ]
  },
  {
    name: 'Robot Vacuum',
    description: 'Smart robot vacuum with mapping technology',
    price: 399.99,
    imageUrl: 'https://placehold.co/400x300?text=Robot+Vacuum',
    variants: [
      { name: 'Basic', sku: 'VAC-BASIC', price: 399.99, inventory: 60 },
      { name: 'Premium', sku: 'VAC-PREMIUM', price: 599.99, inventory: 40 }
    ]
  },
  {
    name: 'Coffee Maker Pro',
    description: 'Smart coffee maker with mobile app control',
    price: 199.99,
    imageUrl: 'https://placehold.co/400x300?text=Coffee+Maker',
    variants: [
      { name: '10-Cup', sku: 'COF-10', price: 199.99, inventory: 80 },
      { name: '12-Cup', sku: 'COF-12', price: 229.99, inventory: 60 }
    ]
  },
  {
    name: 'Air Purifier Plus',
    description: 'Smart air purifier with PM2.5 monitoring',
    price: 299.99,
    imageUrl: 'https://placehold.co/400x300?text=Air+Purifier',
    variants: [
      { name: 'Small Room', sku: 'AIR-S', price: 299.99, inventory: 50 },
      { name: 'Large Room', sku: 'AIR-L', price: 399.99, inventory: 40 }
    ]
  },
  {
    name: 'Smart Doorbell',
    description: 'HD video doorbell with night vision',
    price: 179.99,
    imageUrl: 'https://placehold.co/400x300?text=Smart+Doorbell',
    variants: [
      { name: 'Battery', sku: 'DOOR-BAT', price: 179.99, inventory: 100 },
      { name: 'Wired', sku: 'DOOR-WIRE', price: 159.99, inventory: 80 }
    ]
  },
  {
    name: 'Fitness Tracker',
    description: 'Advanced fitness tracker with ECG monitoring',
    price: 149.99,
    imageUrl: 'https://placehold.co/400x300?text=Fitness+Tracker',
    variants: [
      { name: 'Standard', sku: 'FIT-STD', price: 149.99, inventory: 120 },
      { name: 'Premium', sku: 'FIT-PRO', price: 199.99, inventory: 80 }
    ]
  },
  {
    name: 'Wireless Charger',
    description: 'Fast wireless charger with multiple device support',
    price: 49.99,
    imageUrl: 'https://placehold.co/400x300?text=Wireless+Charger',
    variants: [
      { name: 'Single Device', sku: 'CHRG-1', price: 49.99, inventory: 150 },
      { name: 'Dual Device', sku: 'CHRG-2', price: 79.99, inventory: 100 }
    ]
  }
];

async function main() {
  console.log('Starting database seeding...');
  
  try {
    // Delete existing data
    console.log('Deleting existing data...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.variant.deleteMany();
    await prisma.product.deleteMany();
    console.log('Existing data deleted successfully');

    // Create all products with their variants
    console.log('Creating new products and variants...');
    for (const productData of products) {
      const { variants, ...productInfo } = productData;
      const product = await prisma.product.create({
        data: {
          ...productInfo,
          variants: {
            create: variants
          }
        },
        include: {
          variants: true
        }
      });
      console.log(`Created product: ${product.name} with ${product.variants.length} variants`);
    }

    const productCount = await prisma.product.count();
    const variantCount = await prisma.variant.count();
    console.log(`Database seeded successfully with ${productCount} products and ${variantCount} variants`);
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 