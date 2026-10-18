import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { CheckoutDto } from 'src/DTOs/orders-delivery/checkoutDto';

type ProductProps = {
  cartId: number;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  url: string;
};

type InsertOrderProps = {
  id: number;
};

@Injectable()
export class CheckoutService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async CheckoutDetails(body: CheckoutDto) {
    const client = await this.db.connect();
    const { userId, name, email, phoneNo, orderNumber } = body;

    // const orderNumber = Math.floor(1000 * Math.random() * 9000);

    try {
      await client.query('BEGIN');
      // fetch product details from new_products table for validation
      const getProductDetails = await client.query<ProductProps>(
        `
      SELECT
        c.id AS "cartId",
        ci.product_id,
        ci.quantity,
        p.name,
        p.price,
        i.url
    FROM new_cart c
    JOIN new_cart_items ci
        ON ci.new_cart_id = c.id
    JOIN new_products p
        ON p.legacy_product_id = ci.product_id
    LEFT JOIN LATERAL (
        SELECT url
        FROM new_images
        WHERE product_id = p.id
        ORDER BY id ASC
        LIMIT 1
    ) i ON TRUE
    WHERE c.user_id = $1;
          
          `,
        [userId],
      );
      if (getProductDetails.rowCount === 0) {
        throw new InternalServerErrorException('Failed to fetch product items');
      }

      const products = getProductDetails.rows;
      console.log('the products:', products);

      //insert into order table

      const insertToOrder = await client.query<InsertOrderProps>(
        `
        insert into new_order(order_number, user_id,customer_name, customer_email, customer_phone)
        values($1,$2,$3,$4,$5) returning id
        `,
        [orderNumber, userId, name, email, phoneNo],
      );

      const orderId = insertToOrder.rows[0].id;

      // confirming it was really sent to order
      if (insertToOrder.rowCount === 0) {
        throw new InternalServerErrorException(
          'failed to insert user into order',
        );
      }

      //insert into order items
      for (const productItems of products) {
        const insertOrderItems = await client.query(
          `
          insert into new_order_items (order_id,product_id,product_name,quantity,unit_price)
          values($1,$2,$3,$4,$5)

          `,
          [
            orderId,
            productItems.product_id,
            productItems.name,
            productItems.quantity,
            productItems.price,
          ],
        );

        // confirming it was really sent to order
        if (insertOrderItems.rowCount === 0) {
          throw new InternalServerErrorException(
            'failed to insert user into order items',
          );
        }
      }

      await client.query('COMMIT');
      return products;
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('validating cart error:', err);
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('failed to validate order');
    } finally {
      client.release();
    }
  }
}
