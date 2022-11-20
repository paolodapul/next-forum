import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

const prisma = new PrismaClient();

const userFactory = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    email: `${firstName.toLowerCase()}${lastName.toLowerCase()}_${faker.random.numeric(
      3
    )}@gmail.com`,
    name: `${firstName} ${lastName}`,
  };
};

async function main() {
  const users = _.times(1000, () => userFactory());
  await prisma.user.createMany({
    data: users,
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
