import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create default categories
  const categories = [
    { name: 'Food & Dining', color: '#FF6B6B', isNecessity: true },
    { name: 'Transportation', color: '#4ECDC4', isNecessity: true },
    { name: 'Utilities', color: '#45B7D1', isNecessity: true },
    { name: 'Healthcare', color: '#96CEB4', isNecessity: true },
    { name: 'Shopping', color: '#FECA57', isNecessity: false },
    { name: 'Entertainment', color: '#FF9FF3', isNecessity: false },
    { name: 'Travel', color: '#54A0FF', isNecessity: false },
    { name: 'Hobbies', color: '#5F27CD', isNecessity: false },
    { name: 'Gifts', color: '#FF3838', isNecessity: false },
    { name: 'Education', color: '#00D2D3', isNecessity: false },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  console.log('✅ Seed data created successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })