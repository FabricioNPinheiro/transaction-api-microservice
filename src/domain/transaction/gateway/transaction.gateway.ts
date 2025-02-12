import { Transaction } from '../entity/transaction.entity';

export interface TransactionGateway {
  save(transaction: Transaction): Promise<void>;
  listDetails(id: string): Promise<Transaction[]>;
  listDetailsByUser(userId: string): Promise<Transaction[]>;
}
