
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  'Front-end',
  'Back-end',
  'DevOps',
  'FullStack',
  'JAMstack',
  'AI',
  'Opensource'
]

async function main() {
  categories.forEach(async category => {
    await prisma.category.upsert({
      update: {},
      where: { name: category },
      create: { name: category }
    })
  })
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
