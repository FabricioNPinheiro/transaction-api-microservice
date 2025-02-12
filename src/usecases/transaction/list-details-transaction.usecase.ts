import { Transaction } from '../../domain/transaction/entity/transaction.entity';
import { TransactionGateway } from '../../domain/transaction/gateway/transaction.gateway';
import { Usecase } from '../usecase';

export type ListDetailsTransactionInputDto = {
  id: string;
};

export type ListDetailsTransactionOutputDto = {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  amount: string;
  description: string;
};

export class ListDetailsTransactionUsecase
  implements
    Usecase<ListDetailsTransactionInputDto, ListDetailsTransactionOutputDto>
{
  private constructor(
    private readonly transactionGateway: TransactionGateway,
  ) {}

  public static create(transactionGateway: TransactionGateway) {
    return new ListDetailsTransactionUsecase(transactionGateway);
  }

  public async execute({
    id,
  }: ListDetailsTransactionInputDto): Promise<ListDetailsTransactionOutputDto> {
    const transactions = await this.transactionGateway.listDetails(id);

    const output = this.presentOutput(transactions);

    return output;
  }

  private presentOutput(
    transaction: Transaction,
  ): ListDetailsTransactionOutputDto {
    return {
      id: transaction.id,
      senderUserId: transaction.senderUserId,
      receiverUserId: transaction.receiverUserId,
      amount: transaction.amount,
      description: transaction.description,
    };
  }
}
