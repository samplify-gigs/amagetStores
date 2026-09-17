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
      await this.dailyHomeProducts();
    } catch (err) {
      this.logger.error('startup hotsales run failed', err);
    }
  }

  @Cron('*/5 * * * *')
  async dailyHomeProducts() {
    const client = await this.db.connect();

    try {
      this.logger.log('fetching 8 hotsales products for the day');
      const fetchHotsalesQuery = ` select id , name, price, legacy_product_id, category_id 
      from new_products order by random() limit 8
      `;
      const fetchUpgradePc = ` select id , name, price, legacy_product_id, category_id 
      from new_products where category_id = $1 or category_id = $2 order by random() limit 8;
      `;

      const fetchBNPL = ` select id , name, price, legacy_product_id, category_id 
      from new_products order by random() limit 8
      `;

      const fetchLifestyle = ` select id , name, price, legacy_product_id, category_id 
      from new_products where category_id = $1 order by random() limit 8;
      `;

      const hotSalesRes =
        await client.query<newProductsProps>(fetchHotsalesQuery);
      const upgradePcRes = await client.query<newProductsProps>(
        fetchUpgradePc,
        [2, 3],
      );
      const bnplRes = await client.query<newProductsProps>(fetchBNPL);
      const lifestyleRes = await client.query<newProductsProps>(
        fetchLifestyle,
        [6],
      );

      await client.query('BEGIN');
      await client.query('DELETE FROM new_daily_products');
      const insertQuery =
        'insert into new_daily_products (id,name,price,legacy_product_id,category_id,slot,section) values($1,$2,$3,$4,$5,$6,$7)';

      const insertItems = async (
        products: newProductsProps[],
        section: string,
      ) => {
        for (let i = 0; i < products.length; i++) {
          const eachProduct = products[i];
          await client.query(insertQuery, [
            eachProduct.id,
            eachProduct.name,
            eachProduct.price,
            eachProduct.legacy_product_id,
            eachProduct.category_id,
            i + 1,
            section,
          ]);
        }
      };

      await insertItems(hotSalesRes.rows, 'hot-sales');
      await insertItems(upgradePcRes.rows, 'upgrade-Pc');
      await insertItems(bnplRes.rows, 'bnpl');
      await insertItems(lifestyleRes.rows, 'lifestyle');

      await client.query('COMMIT');
      this.logger.log('daily products successfully updated');
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
    try {
      const query = `select new_daily_products.id,new_daily_products.price,new_daily_products.name,new_daily_products.legacy_product_id,
    new_daily_products.category_id,new_categories.slug as categ_name, url from new_daily_products 
    LEFT JOIN new_categories on new_daily_products.category_id = new_categories.id 
    left join lateral ( select url from new_images where product_id = new_daily_products.id limit 1) img on true 
    where new_daily_products.section = $1 limit 8
    ;`;

      const { rows: result } = await this.db.query<newProductsProps>(query, [
        'hot-sales',
      ]);

      return result;
    } catch (err) {
      console.error('hot sales err:', err);
      throw new InternalServerErrorException(
        'could not fecth hot sales products',
      );
    }
  }

  async getUpgradePcProducts() {
    try {
      const query = `select new_daily_products.id,new_daily_products.price,new_daily_products.name,new_daily_products.legacy_product_id,
    new_daily_products.category_id,new_categories.slug as categ_name, url from new_daily_products 
    LEFT JOIN new_categories on new_daily_products.category_id = new_categories.id 
    left join lateral ( select url from new_images where product_id = new_daily_products.id limit 1) img on true 
	where new_daily_products.section = $1 limit 8
	;`;

      const { rows: result } = await this.db.query<newProductsProps>(query, [
        'upgrade-Pc',
      ]);

      return result;
    } catch (err) {
      console.error('upgradePc err:', err);
      throw new InternalServerErrorException(
        'could not fecth upgrade Pc products',
      );
    }
  }

  async getBnplProducts() {
    try {
      const query = `select new_daily_products.id,new_daily_products.price,new_daily_products.name,new_daily_products.legacy_product_id,
    new_daily_products.category_id,new_categories.slug as categ_name, url from new_daily_products 
    LEFT JOIN new_categories on new_daily_products.category_id = new_categories.id 
    left join lateral ( select url from new_images where product_id = new_daily_products.id limit 1) img on true 
	where new_daily_products.section = $1 limit 8
	;`;

      const { rows: result } = await this.db.query<newProductsProps>(query, [
        'bnpl',
      ]);

      return result;
    } catch (err) {
      console.error('bnpl err:', err);
      throw new InternalServerErrorException('could not fecth bnpl products');
    }
  }

  async getLifestyleProducts() {
    try {
      const query = `select new_daily_products.id,new_daily_products.price,new_daily_products.name,new_daily_products.legacy_product_id,
    new_daily_products.category_id,new_categories.slug as categ_name, url from new_daily_products 
    LEFT JOIN new_categories on new_daily_products.category_id = new_categories.id 
    left join lateral ( select url from new_images where product_id = new_daily_products.id limit 1) img on true 
	where new_daily_products.section = $1 limit 8
	;`;

      const { rows: result } = await this.db.query<newProductsProps>(query, [
        'lifestyle',
      ]);

      return result;
    } catch (err) {
      console.error('lifestyle err:', err);
      throw new InternalServerErrorException(
        'could not fecth lifestyle products',
      );
    }
  }

  async getHomeProducts() {
    const [hotsales, upgradepc, bnpl, lifestyle] = await Promise.all([
      this.getHotSalesLiveProducts(),
      this.getUpgradePcProducts(),
      this.getBnplProducts(),
      this.getLifestyleProducts(),
    ]);

    return {
      hotsales: hotsales,
      upgradepc: upgradepc,
      bnpl: bnpl,
      lifestyle: lifestyle,
    };
  }
}
