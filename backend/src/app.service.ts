import {
  Injectable,
  Inject,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';

type HotsalesItem = {
  id: number;
  name: string;
  price: number;
  category_id: number;
};

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async onModuleInit() {
    await this.testConnection();
  }

  async testConnection() {
    try {
      const result = await this.db.query('Select now()');
      console.log('Db connection succesful ✔:', result.rows);
    } catch (err) {
      console.error('failed to connect db ❌', err);
    }
  }

  async fetchHotSales() {
    const result = await this.db.query<HotsalesItem>(
      'select new_products.id,new_products.price,new_products.name,new_products.legacy_product_id,new_products.category_id,new_categories.slug as categ_name, url from new_products LEFT JOIN new_categories on new_products.category_id = new_categories.id left join lateral ( select url from new_images where product_id = new_products.id limit 1) on true limit 8',
    );
    return result.rows;
  }

  async fetchUpgradePc() {
    const result = await this.db.query<HotsalesItem>(
      'select new_products.id,new_products.price,new_products.name,new_products.legacy_product_id,new_products.category_id,new_categories.slug as categ_name, url from new_products LEFT JOIN new_categories on new_products.category_id = new_categories.id left join lateral ( select url from new_images where product_id = new_products.id limit 1) on true limit 8',
    );
    return result.rows;
  }

  async fetchBNPL() {
    const result = await this.db.query<HotsalesItem>(
      'select new_products.id,new_products.price,new_products.name,new_products.legacy_product_id,new_products.category_id,new_categories.slug as categ_name, url from new_products LEFT JOIN new_categories on new_products.category_id = new_categories.id left join lateral ( select url from new_images where product_id = new_products.id limit 1) on true limit 8',
    );
    return result.rows;
  }

  async fetchLifestyle() {
   const result = await this.db.query<HotsalesItem>(
      'select new_products.id,new_products.price,new_products.name,new_products.legacy_product_id,new_products.category_id,new_categories.slug as categ_name, url from new_products LEFT JOIN new_categories on new_products.category_id = new_categories.id left join lateral ( select url from new_images where product_id = new_products.id limit 1) on true limit 8',
    );
    return result.rows;
  }

  async getHomepage() {
    try {
      const [Hotsales, upgradePC, BNPL, Lifestyle] = await Promise.all([
        this.fetchHotSales(),
        this.fetchUpgradePc(),
        this.fetchBNPL(),
        this.fetchLifestyle(),
      ]);

      return {
        hotsales: Hotsales,
        upgradPc: upgradePC,
        bnpl: BNPL,
        Lifestyle: Lifestyle,
      };
    } catch (err) {
      console.error('this fetch home carousels errors:', err);
      throw new InternalServerErrorException('could not connect to server');
    }
  }
}
