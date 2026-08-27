import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

type CategoryItem = {
  id: number;
  name: string;
  price: number;
  url: string;
  total_count: number;
};

@Injectable()
export class CategoryService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}
  async test(body: { offset: number }) {
    const query = `select new_products.id, 
    new_products.name,new_products.price, img.url as url,
    count(*) over() as total_count from new_products left join lateral 
    (select url from new_images where new_images.product_id = new_products.id order by new_images.id limit 1) img on true order by new_products.id limit 10 offset $1`;
    const result = await this.db.query<CategoryItem>(query, [body.offset]);

    return { categoryProducts: result.rows };
  }
}
