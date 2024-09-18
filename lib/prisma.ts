import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Type assertion for globalThis
  prisma = (global as any).prisma || new PrismaClient();
  (global as any).prisma = prisma;
}

export default prisma;
