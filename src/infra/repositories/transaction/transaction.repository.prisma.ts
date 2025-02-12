import { PrismaClient } from '@prisma/client';
import { Transaction } from '../../../domain/transaction/entity/transaction.entity';
import { TransactionGateway } from '../../../domain/transaction/gateway/transaction.gateway';

export class TransactionRepositoryPrisma implements TransactionGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new TransactionRepositoryPrisma(prismaClient);
  }

  public async save(transaction: Transaction): Promise<void> {
    const data = {
      id: transaction.id,
      senderUserId: transaction.senderUserId,
      receiverUserId: transaction.receiverUserId,
      amount: transaction.amount,
      description: transaction.description,
    };

    await this.prismaClient.transaction.create({ data });
  }

  public async listDetails(id: string): Promise<Transaction> {
    const transaction = await this.prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return Transaction.with({
      id: transaction.id,
      senderUserId: transaction.senderUserId,
      receiverUserId: transaction.receiverUserId,
      amount: transaction.amount,
      description: transaction.description,
    });
  }

  public async listDetailsByUser(userId: string): Promise<Transaction[]> {
    const transactions = await this.prismaClient.transaction.findMany({
      where: {
        OR: [{ senderUserId: userId }, { receiverUserId: userId }],
      },
    });

    return transactions.map((t) =>
      Transaction.with({
        id: t.id,
        senderUserId: t.senderUserId,
        receiverUserId: t.receiverUserId,
        amount: t.amount,
        description: t.description,
      }),
    );
  }
}
