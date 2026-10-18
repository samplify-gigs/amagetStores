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

type ProductDataProps = {
  name: string;
  price: number;
  url: string;
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
      const productData: ProductDataProps[] = [];
      // looping throught items to get each products price
      for (const item of items) {
        const productResult = await client.query<ProductDataProps>(
          `SELECT p.name, p.price,url
         FROM new_products as p
         INNER JOIN new_images img on img.product_id = p.id
         WHERE legacy_product_id = $1
         limit 1`,
          [item.productId],
        );

        // Product doesn't exist
        if (productResult.rowCount === 0) {
          throw new NotFoundException('Product not found');
        }

        productData.push(productResult.rows[0]);
        const productPrice = Number(productResult.rows[0].price);

        // Calculate total
        const totalPrice = productPrice * item.quantity;
        const totalPriceINaira = totalPrice * 1400;
        totalItemPrice += totalPriceINaira;
      }
      
      await client.query('COMMIT');
      return {
        totalItemPrice,
        productData,
      };
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('validating cart error:', err);
      if (err instanceof HttpException) throw err; 
      throw new InternalServerErrorException('failed to validate cart');
    } finally {
      client.release();
    }
  }
}
