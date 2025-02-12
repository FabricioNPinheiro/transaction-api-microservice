import { Transaction } from '../../domain/transaction/entity/transaction.entity';
import { TransactionGateway } from '../../domain/transaction/gateway/transaction.gateway';
import { Usecase } from '../usecase';

export type ListDetailsTransactionByUserInputDto = {
  userId: string;
};

export type ListDetailsTransactionByUserOutputDto = {
  transactions: {
    id: string;
    senderUserId: string;
    receiverUserId: string;
    amount: string;
    description: string;
    type: 'sent' | 'received';
  }[];
};

export class ListDetailsTransactionByUserUsecase
  implements
    Usecase<
      ListDetailsTransactionByUserInputDto,
      ListDetailsTransactionByUserOutputDto
    >
{
  private constructor(
    private readonly transactionGateway: TransactionGateway,
  ) {}

  public static create(transactionGateway: TransactionGateway) {
    return new ListDetailsTransactionByUserUsecase(transactionGateway);
  }

  public async execute({
    userId,
  }: ListDetailsTransactionByUserInputDto): Promise<ListDetailsTransactionByUserOutputDto> {
    const transactions =
      await this.transactionGateway.listDetailsByUser(userId);

    const output = this.presentOutput(transactions, userId);

    return output;
  }

  private presentOutput(
    transactions: Transaction[],
    userId: string,
  ): ListDetailsTransactionByUserOutputDto {
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
