import { dbConfig } from '@/config/env';
import { defineConfig } from 'drizzle-kit';

console.log(`XATA_POSTGRESQL_URL: ${dbConfig.connectionString}`);

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: 'postgresql',
 out: "./src/db/migrations",
 dbCredentials:{
    url:String(dbConfig.connectionString)!
 }
});