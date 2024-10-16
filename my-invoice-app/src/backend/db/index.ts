import { dbConfig } from '@/config/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Invoices, Customers } from './schema';
const pool = new Pool({ connectionString: dbConfig.connectionString, max: 20 });
export const db = drizzle(pool,{
    schema:{
        Invoices,
        Customers
    }
});