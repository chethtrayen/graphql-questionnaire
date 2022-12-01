import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line
async function main() {
  await prisma.user.upsert({
    where: { email: 'foo@bar.com'},
    update: {},
    create: {
      email: 'foo@bar.com',
      name: 'foobar'
    }
  });

  await prisma.user.upsert({
    where: { email: 'bar@foo.com'},
    update: {},
    create: {
      email: 'bar@foo.com',
      name: 'barfoo'
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
