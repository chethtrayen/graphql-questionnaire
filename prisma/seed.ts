import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { runSeed } from "./seeds";

// eslint-disable-next-line
async function main() {
  await runSeed();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
