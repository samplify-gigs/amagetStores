import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Pool } from 'pg';

type newProductsProps = {
  id: number;
  name: string;
  price: number;
  legacy_product_id: number;
  category_id: number;
};

@Injectable()
export class NodeCronService {
  private readonly logger = new Logger(NodeCronService.name);

  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async onModuleInit() {
    this.logger.log('cron is running right away');
    try {
      await this.hotsalesProducts();
    } catch (err) {
      this.logger.error('startup hotsales run failed', err);
    }
  }

  @Cron('*/5 * * * *')
  async hotsalesProducts() {
    const client = await this.db.connect();

    try {
      this.logger.log('fetching 8 hotsales productfor the day');
      const fetchQuery = ` select id , name, price, legacy_product_id, category_id 
      from new_products order by random() limit 8
      `;

      const result = await this.db.query<newProductsProps>(fetchQuery);
      console.log('db hotsales result:', result.rows);
      const newProducts = result.rows;
      await client.query('BEGIN');
      await client.query('DELETE FROM hot_sales');
      const insertQuery =
        'insert into hot_sales (id,name,price,legacy_product_id,category_id,slot) values($1,$2,$3,$4,$5,$6)';

      for (let i = 0; i < newProducts.length; i++) {
        const currentProduct = newProducts[i];
        await client.query(insertQuery, [
          currentProduct.id,
          currentProduct.name,
          currentProduct.price,
          currentProduct.legacy_product_id,
          currentProduct.category_id,
          i + 1,
        ]);
      }

      await client.query('COMMIT');
      this.logger.log('successfully updated');
    } catch (err) {
      this.logger.error('err fetching is:', err);
      throw new InternalServerErrorException(
        'could not fetch hotsales products',
      );
    } finally {
      client.release();
    }
  }

  async getHotSalesLiveProducts() {
    const query = `select hot_sales.id,hot_sales.price,hot_sales.name,hot_sales.legacy_product_id,
    hot_sales.category_id,new_categories.slug as categ_name, url from hot_sales 
    LEFT JOIN new_categories on hot_sales.category_id = new_categories.id 
    left join lateral ( select url from new_images where product_id = hot_sales.id limit 1) on true limit 8;`;

    const result = await this.db.query(query);

    return {
      hotsales: result.rows,
    };
  }
}
