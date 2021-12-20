module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['dist/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['dist/**/*.entity.ts'],
  cli: {
    migrationsDir: 'dist/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
