import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { CreateCartDTO } from 'src/DTOs/orders-delivery/createcartDto';

type CartIDProps = {
  id: number;
};

type PriceProps = {
  price: number;
};

@Injectable()
export class CartValidationService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async validateCartCreation(body: CreateCartDTO) {
    const client = await this.db.connect();
    const { userId, items } = body;

    try {
      await client.query('BEGIN');
      // first insert the userid into cart
      const { rows } = await client.query<CartIDProps>(
        ` INSERT INTO new_cart (user_id)
          VALUES ($1)
          ON CONFLICT (user_id)
          DO UPDATE SET user_id = EXCLUDED.user_id
          RETURNING id`,
        [userId],
      );

      //get the cart id
      const cartId = rows[0].id;

      //loop through items and insert into cart items including the just recieved cart id
      for (const item of items) {
        const cartItemResult = await client.query(
          `insert into new_cart_items (new_cart_id, product_id,quantity) values($1,$2,$3) on conflict (new_cart_id, product_id) DO UPDATE SET quantity = EXCLUDED.quantity 
         returning product_id, quantity`,
          [cartId, item.productId, item.quantity],
        );

        // Making sure the cart item was actually created
        if (cartItemResult.rowCount === 0) {
          throw new InternalServerErrorException('Failed to create cart item');
        }
      }

      let totalItemPrice = 0;
      // looping throught items to get each products price
      for (const item of items) {
        const productResult = await client.query<PriceProps>(
          `SELECT price
         FROM new_products
         WHERE legacy_product_id = $1`,
          [item.productId],
        );

        // Product doesn't exist
        if (productResult.rowCount === 0) {
          throw new NotFoundException('Product not found');
        }

        const productPrice = Number(productResult.rows[0].price);
        const priceInNaira = productPrice * 1400;

        // Calculate total
        const totalPrice = priceInNaira * item.quantity;
        totalItemPrice += totalPrice;

       
      }

      await client.query('COMMIT');
      return {
        totalItemPrice,
      };
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('validating cart error:', err);
      if (err instanceof HttpException) throw err; // import HttpException from '@nestjs/common'
      throw new InternalServerErrorException('failed to validate cart');
    } finally {
      client.release();
    }
  }
}
