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
      'select id,name,price,category_id from new_products limit 8 ',
    );

    return result.rows;
  }

  async fetchUpgradePc() {
    const result = await this.db.query<HotsalesItem>(
      'select id, name, category_id, price from new_products limit 8',
    );

    return result.rows;
  }

  async fetchBNPL() {
    const result = await this.db.query<HotsalesItem>(
      'select id, name, category_id, price from new_products limit 8',
    );

    return result.rows;
  }

  async fetchLifestyle() {
    const result = await this.db.query<HotsalesItem>(
      'select id, name, category_id, price, url from new_products',
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
      console.error('this fetch home errors:', err);
      throw new InternalServerErrorException('could not connect to server');
    }
  }
}
