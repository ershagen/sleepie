import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Tables already applied manually to Supabase for Sleepie.
  // This migration is recorded so Payload stays in sync on future deploys.
  await db.execute(sql`SELECT 1`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`SELECT 1`);
}
