import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: () => {
        return new Pool({
          connectionString:
            'postgres://postgres:bisolaluv@localhost:5432/postgres',
          password: 'bisolaluv',
          user: 'postgres',
          
        });
      },
    },
  ],
  exports: ['PG_POOL'],
})
export class DatabaseModule {}
