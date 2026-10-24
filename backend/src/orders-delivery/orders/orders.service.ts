import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { createOrderUserid } from 'src/DTOs/orders-delivery/orderUserId';

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

export interface PriceProps {
  total_price: number;
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

  async getOrderDetailesUserid(body: createOrderUserid) {
    const { userId } = body;

    try {
      const fetchTotalPrice = await this.db.query<PriceProps>(
        `
        select sum(noi.unit_price) as total_price
        from new_order no
        join new_order_items noi on no.id = noi.order_id
        where user_id = $1
        ;
        `,
        [userId],
      );

      const totalPrice = fetchTotalPrice.rows

      return totalPrice;
    } catch (err) {
      console.error('failed to fetch order userId:', err);
      throw new InternalServerErrorException(err);
    }
  }
}
