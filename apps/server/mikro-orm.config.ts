// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  clientUrl: 'mongodb://localhost:27017',
  type: 'mongo',
  ensureIndexes: true,
  dbName: 'actions',
  autoLoadEntities: true,
  metadataProvider: TsMorphMetadataProvider,
};

export default config;
