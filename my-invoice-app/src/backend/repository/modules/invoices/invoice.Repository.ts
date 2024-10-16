import { Result } from "neverthrow";
import {
  addInvoiceRepositoryAsync,
  IAddInvoiceRepositoryDTO,
} from "./activity/add.Invoice";
import {
  IUpdateStatusRepositoryDTO,
  updateStatusRepositoryAsync,
} from "./activity/updateStatus.Invoice";
import {
  deleteInvoiceRepositoryAsync,
  IDeleteInvoiceRepositoryDTO,
} from "./activity/delete.Invoice";
import {
  getAllInvoicesRepositoryAsync,
  getInvoicesByIdRepositoryAsync,
  IGetAllInvoiceResultDTO,
  IGetAllInvoicesRepositoryDTO,
  IGetInvoiceByIdRepositoryDTO,
  IGetInvoiceByIdResultDTO,
} from "./activity/get.Invoice";
import {
  IUpdateInvoiceRepositoryDTO,
  updateInvoiceRepositoryAsync,
} from "./activity/updateInvoice";

export interface IInvoiceRepository {
  addAsync(params: IAddInvoiceRepositoryDTO): Promise<Result<number, Error>>;
  updateStatusAsync(
    params: IUpdateStatusRepositoryDTO
  ): Promise<Result<boolean, Error>>;
  deleteAsync(
    params: IDeleteInvoiceRepositoryDTO
  ): Promise<Result<boolean, Error>>;
  getAllInvoicesAsync(
    params: IGetAllInvoicesRepositoryDTO
  ): Promise<Result<IGetAllInvoiceResultDTO[], Error>>;
  getInvoicesByIdAsync(
    params: IGetInvoiceByIdRepositoryDTO
  ): Promise<Result<IGetInvoiceByIdResultDTO, Error>>;

  updateInvoiceAsync(
    params: IUpdateInvoiceRepositoryDTO
  ): Promise<Result<boolean, Error>>;
}

export default class InvoiceRepository implements IInvoiceRepository {
  public addAsync(
    params: IAddInvoiceRepositoryDTO
  ): Promise<Result<number, Error>> {
    return addInvoiceRepositoryAsync(params);
  }

  public updateStatusAsync(
    params: IUpdateStatusRepositoryDTO
  ): Promise<Result<boolean, Error>> {
    return updateStatusRepositoryAsync(params);
  }

  public deleteAsync(
    params: IDeleteInvoiceRepositoryDTO
  ): Promise<Result<boolean, Error>> {
    return deleteInvoiceRepositoryAsync(params);
  }

  public getAllInvoicesAsync(
    params: IGetAllInvoicesRepositoryDTO
  ): Promise<Result<IGetAllInvoiceResultDTO[], Error>> {
    return getAllInvoicesRepositoryAsync(params);
  }

  public getInvoicesByIdAsync(
    params: IGetInvoiceByIdRepositoryDTO
  ): Promise<Result<IGetInvoiceByIdResultDTO, Error>> {
    return getInvoicesByIdRepositoryAsync(params);
  }

  public updateInvoiceAsync(
    params: IUpdateInvoiceRepositoryDTO
  ): Promise<Result<boolean, Error>> {
    return updateInvoiceRepositoryAsync(params);
  }
}
