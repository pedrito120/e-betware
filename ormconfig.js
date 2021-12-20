module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['**/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['**/**/*.entity.ts'],
  cli: {
    migrationsDir: '**/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
