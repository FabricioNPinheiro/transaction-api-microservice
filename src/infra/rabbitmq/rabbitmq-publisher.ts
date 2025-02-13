import amqp from 'amqplib';
import { TransactionProps } from '../../domain/transaction/entity/transaction.entity';

export async function publishTransactionEvent(transaction: TransactionProps) {
  const connection = await amqp.connect('amqp://127.0.0.1');
  const channel = await connection.createChannel();
  const queue = 'transactions';

  await channel.assertQueue(queue, { durable: true });

  const message = JSON.stringify(transaction);
  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`Enviado para fila ${queue}: ${message}`);

  setTimeout(() => {
    connection.close();
  }, 500);
}
