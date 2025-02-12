import { Transaction } from '../../domain/transaction/entity/transaction.entity';
import { TransactionGateway } from '../../domain/transaction/gateway/transaction.gateway';
import { Usecase } from '../usecase';

export type ListDetailsTransactionInputDto = {
  userId: string;
};

export type ListDetailsTransactionOutputDto = {
  transactions: {
    id: string;
    senderUserId: string;
    receiverUserId: string;
    amount: number;
    description: string;
    type: 'sent' | 'received';
  }[];
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
    userId,
  }: ListDetailsTransactionInputDto): Promise<ListDetailsTransactionOutputDto> {
    const transactions =
      await this.transactionGateway.listDetailsByUser(userId);

    const output = this.presentOutput(transactions, userId);

    return output;
  }

  private presentOutput(
    transactions: Transaction[],
    userId: string,
  ): ListDetailsTransactionOutputDto {
    return {
      transactions: transactions.map((t) => {
        return {
          id: t.id,
          senderUserId: t.senderUserId,
          receiverUserId: t.receiverUserId,
          amount: t.amount,
          description: t.description,
          type: t.senderUserId === userId ? 'sent' : 'received',
        };
      }),
    };
  }
}
