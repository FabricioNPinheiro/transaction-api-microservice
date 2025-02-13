import { Transaction } from '../../domain/transaction/entity/transaction.entity';
import { TransactionGateway } from '../../domain/transaction/gateway/transaction.gateway';
import { publishTransactionEvent } from '../../infra/rabbitmq/rabbitmq-publisher';
import { Usecase } from '../usecase';

export type CreateTransactionInputDto = {
  senderUserId: string;
  receiverUserId: string;
  amount: string;
  description: string;
};

export type CreateTransactionOutputDto = {
  id: string;
};

export class CreateTransactionUsecase
  implements Usecase<CreateTransactionInputDto, CreateTransactionOutputDto>
{
  private constructor(
    private readonly transactionGateway: TransactionGateway,
  ) {}

  public static create(transactionGateway: TransactionGateway) {
    return new CreateTransactionUsecase(transactionGateway);
  }

  public async execute({
    senderUserId,
    receiverUserId,
    amount,
    description,
  }: CreateTransactionInputDto): Promise<CreateTransactionOutputDto> {
    const aTransaction = Transaction.create(
      senderUserId,
      receiverUserId,
      amount,
      description,
    );

    await this.transactionGateway.save(aTransaction);

    const output = this.presentOutput(aTransaction);

    await publishTransactionEvent(aTransaction);

    return output;
  }

  private presentOutput(transaction: Transaction): CreateTransactionOutputDto {
    const output: CreateTransactionOutputDto = {
      id: transaction.id,
    };

    return output;
  }
}
