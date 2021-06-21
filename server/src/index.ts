import "reflect-metadata";
import { createConnection } from "typeorm";

const main = async () => {
  const connection = await createConnection();
  await connection.runMigrations();
};

main().catch((err) => {
  console.error(err);
});
