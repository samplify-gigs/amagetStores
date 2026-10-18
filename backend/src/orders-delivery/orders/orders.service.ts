import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';

export interface DeliveryOption {
  id: number;
  method: string;
  fee: number;
}

export interface DeliveryLocation {
  locationid: string;
  stateid: number;
  name: string;
  address: string;
  delivery_options: DeliveryOption[];
}

@Injectable()
export class OrdersFeeService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async getDeliveryFee() {
    try {
      const getDeliverydetails = await this.db.query<DeliveryLocation>(`

        select id as locationId, stateid, name, address,
          json_agg(json_build_object('id', id, 'method', method, 'fee', fee ::float)
          order by method) as delivery_options
          from delivery_location_methods
          group by id,stateid, name,address
          order by name
        `);

      const locationDetails = getDeliverydetails.rows;

      return locationDetails;
    } catch (err) {
      console.error('orders error:', err);
      throw new InternalServerErrorException(
        'couldnt complete delivery fee from order',
      );
    }
  }
}
