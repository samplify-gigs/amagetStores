import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';

type SearchItems = {
  id: number;
  name: string;
};

@Injectable()
export class GlobalItemSearchService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async searchDb(body: { searchQuery: string }) {
    const { searchQuery } = body;
    console.log('testing query:', searchQuery);
    try {
      const query = `select id , name from new_products where name ilike $1 or 
      description ilike $1 limit 10`;
      const result = await this.db.query<SearchItems>(query, [
        '%' + searchQuery + '%',
      ]);

      return result.rows;
    } catch (err) {
      console.error('searching product error:', err);
      throw new InternalServerErrorException('could not search');
    }
  }
}
