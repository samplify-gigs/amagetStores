import {
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

@Injectable()
export class CartValidationService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async validateCartCreation(body: CreateCartDTO) {
    const client = await this.db.connect();
    const { userId, ProductId, quantity } = body;
    try {
      await client.query('BEGIN');
      const { rows } = await client.query<CartIDProps>(
        ` INSERT INTO new_cart (user_id)
          VALUES ($1)
          ON CONFLICT (user_id)
          DO UPDATE SET user_id = EXCLUDED.user_id
          RETURNING id`,
        [userId],
      );

      const cartId = rows[0].id;

      //insert into cart items
      const cartItemResult = await client.query(
        `insert into new_cart_items (new_cart_id, product_id,quantity) values($1,$2,$3) on conflict (new_cart_id, product_id) do nothing 
         returning product_id, quantity`,
        [cartId, ProductId, quantity],
      );

      // Make sure the cart item was actually created
      if (cartItemResult.rowCount === 0) {
        throw new InternalServerErrorException('Failed to create cart item');
      }

      // Get product price
      const productResult = await client.query<ProductPriceProps>(
        `SELECT price
         FROM products
         WHERE id = $1`,
        [ProductId],
      );

      // Product doesn't exist
      if (productResult.rowCount === 0) {
        throw new NotFoundException('Product not found');
      }

      const productPrice = Number(productResult.rows[0].price);

      // Calculate total
      const totalPrice = productPrice * quantity;

      await client.query('COMMIT');
      return {
        cartId,
        productId: ProductId,
        quantity,
        unitPrice: productPrice,
        totalPrice,
      };
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('validating cart error:', err);
      throw new InternalServerErrorException('failed to validate cart');
    } finally {
      client.release();
    }
  }
}
