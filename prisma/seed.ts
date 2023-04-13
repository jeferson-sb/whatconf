import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  'Front-end',
  'Back-end',
  'DevOps',
  'FullStack',
  'JAMstack',
  'AI',
  'Opensource',
]

async function main() {
  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(startDate.getDate() + 1)

  categories.forEach(async (category) => {
    await prisma.category.upsert({
      update: { name: category },
      where: { name: category },
      create: { name: category },
    })
  })

  const category = await prisma.category.findFirst()

  await prisma.event.create({
    data: {
      title: 'Demo conf',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non ex eget enim bibendum gravida. Fusce ut eleifend sapien. Morbi ultrices libero urna, quis cursus magna finibus non',
      location: 'Online',
      virtual: true,
      startDate,
      endDate,
      categoryId: category?.id,
    },
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
