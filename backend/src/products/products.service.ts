import {
  Body,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { ProductsPagesDto } from 'src/DTOs/ProductsPage/productsPage';

type ProductProps = {
  id: number;
  legacy_product_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: number;
  cat_name: string | null;
  in_stock: boolean;
  images: string[];
};

@Injectable()
export class ProductsService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {
    console.log('play me by dumebi');
  }

  async fetchProductDetails(@Body() body: ProductsPagesDto) {
    const { legacyProductId } = body;

    try {
      const query = `SELECT
    p.id,
    p.legacy_product_id,
    p.name,
    p.slug,
    p.description,
    p.price,
    p.category_id,
    c.slug AS cat_name,
    p.in_stock,
    COALESCE(
        array_agg(i.url) FILTER (WHERE i.url IS NOT NULL),
        '{}'
    ) AS images
FROM new_products p
LEFT JOIN new_images i
    ON i.product_id = p.id
LEFT JOIN new_categories c
    ON c.id = p.category_id
WHERE p.legacy_product_id = $1
GROUP BY
    p.id,
    p.legacy_product_id,
    p.name,
    p.slug,
    p.description,
    p.price,
    p.category_id,
    c.slug,
    p.in_stock;
 

      `;

      const res = await this.db.query<ProductProps>(query, [legacyProductId]);

      return res.rows;
    } catch (err) {
      console.error('product page details error:', err);
      throw new InternalServerErrorException('failed to fetch Products err');
    }
  }
}
