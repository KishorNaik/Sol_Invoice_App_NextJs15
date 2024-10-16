import { Result } from "neverthrow";
import {
  addCustomerRepository,
  IAddCustomerRepositoryDTO,
} from "./activity/add.Customer";

export interface ICustomerRepository {
  addAsync(params: IAddCustomerRepositoryDTO): Promise<Result<number, Error>>;
}

class CustomerRepository implements ICustomerRepository {
  public addAsync(
    params: IAddCustomerRepositoryDTO
  ): Promise<Result<number, Error>> {
    return addCustomerRepository(params);
  }
}

export default CustomerRepository;
