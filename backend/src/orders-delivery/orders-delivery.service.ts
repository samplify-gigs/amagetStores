import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';

type StateQuery = {
  id: number;
  name: string;
  code: string;
};

type LocationQuery = {
  id: number;
  state_id: number;
  name: string;
  address: string;
};

@Injectable()
export class OrdersDeliveryService {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  //fetch states id , name

  async fetchLocationDetails() {
    try {
      const fetchState = this.db.query<StateQuery>(
        ' select id, name , code from new_states ',
      );

      const fetchlocationDetails = this.db.query<LocationQuery>(
        'select id, state_id, name, address from new_delivery_locations',
      );

      const [state, location] = await Promise.all([
        fetchState,
        fetchlocationDetails,
      ]);

      return {
        state: state.rows,
        location: location.rows,
      };
    } catch (err) {
      console.error(' state and location error is:', err);
      throw new InternalServerErrorException(
        'failed to fetch state and location',
      );
    }
  }
}
