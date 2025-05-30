# TaskBRB E-commerce App

A modern e-commerce application built with Next.js, Prisma, and PostgreSQL.

## Features

- Product listing with search and filters
- Product variants and inventory management
- Shopping cart functionality
- Checkout process
- Order management
- Responsive design

## Tech Stack

- Next.js 14
- PostgreSQL
- Prisma ORM
- TailwindCSS
- Vercel (deployment)

## Deployment Instructions

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Set up a PostgreSQL database:
   - Create a database on [Neon](https://neon.tech) (recommended for Vercel deployment)
   - Get your database connection string

4. Deploy to Vercel:
   ```bash
   vercel
   ```

5. Set up environment variables in Vercel:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `DIRECT_URL`: Your direct database connection string (for Neon)

6. Run database migrations:
   ```bash
   vercel env pull .env
   npx prisma migrate deploy
   npx prisma db seed
   ```

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/taskbrb_db"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database:
   ```bash
   npx prisma db seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses the following main models:
- Product: Store product information
- Variant: Product variations (size, color, etc.)
- Order: Customer orders
- OrderItem: Individual items in an order

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
