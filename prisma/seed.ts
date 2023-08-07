import { STATUS } from "@prisma/client";
import { hashPassword } from "../lib/auth";
import { db } from "../lib/db";

const getRandomTaskStatus = () => {
  const statuses = [STATUS.COMPLETED, STATUS.NOT_STARTED, STATUS.STARTED];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.company.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      name: "User",
      sector: "Agro",
      password: await hashPassword("password"),
      certifications: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Certification ${i}`,
          due: new Date(2023, 10, 17),
          description: `Descrição da Certificação ${i}`,
        })),
      },
    },
    include: {
      certifications: true,
    },
  });

  const tasks = await Promise.all(
    user.certifications.map((certification) =>
      db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Task ${i}`,
            companyId: user.id,
            certificationId: certification.id,
            description: `Descrição da Task ${i}`,
            status: getRandomTaskStatus(),
          };
        }),
      }),
    ),
  );

  console.log({ user, tasks });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
