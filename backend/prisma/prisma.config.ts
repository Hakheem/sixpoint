import { defineConfig } from '@prisma/config';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL in environment variables");
}

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: databaseUrl,
  },
});

