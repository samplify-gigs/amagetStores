import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { FetchCategoryProductsDto } from 'src/DTOs/category/category-items';

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
  async fetchCategoryProducts(body: FetchCategoryProductsDto) {
    const { categoryId, offset } = body;

    try {
      const query = `select new_products.id,
    new_products.name, new_products.price, img.url as url,
    count(*) over() as total_count
    from new_products
    left join lateral (
    select url from new_images
    where new_images.product_id = new_products.id
    order by new_images.id
    limit 1
  ) img on true
    where new_products.category_id = $1
    order by new_products.id
    limit 10 offset $2`;
      const result = await this.db.query<CategoryItem>(query, [
        categoryId,
        offset,
      ]);

      return { categoryProducts: result.rows };
    } catch (err) {
      console.error('category fecth error:', err);
      throw new InternalServerErrorException(
        'fetching category products error',
      );
    }
  }
}
