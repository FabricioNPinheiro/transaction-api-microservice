import { Request, Response } from 'express';
import {
  ListDetailsTransactionOutputDto,
  ListDetailsTransactionUsecase,
} from '../../../../../usecases/transaction/list-details-transaction.usecase';
import { HttpMethod, Route } from '../route';

export type ListDetailsTransactionResponseDto = {
  transactions: {
    id: string;
    senderUserId: string;
    receiverUserId: string;
    amount: string;
    description: string;
    type: 'sent' | 'received';
  }[];
};

export class ListDetailsTransactionByUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listDetailsTransactionService: ListDetailsTransactionUsecase,
  ) {}

  public static create(
    listDetailsTransactionService: ListDetailsTransactionUsecase,
  ) {
    return new ListDetailsTransactionByUserRoute(
      '/transactions/user/:userId',
      HttpMethod.GET,
      listDetailsTransactionService,
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { userId } = request.params;

      const output = await this.listDetailsTransactionService.execute({
        userId,
      });

      const responseBody = this.present(output, userId);

      response.status(200).json(responseBody).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(
    input: ListDetailsTransactionOutputDto,
    userId: string,
  ): ListDetailsTransactionResponseDto {
    const response: ListDetailsTransactionResponseDto = {
      transactions: input.transactions.map((t) => ({
        id: t.id,
        senderUserId: t.senderUserId,
        receiverUserId: t.receiverUserId,
        amount: t.amount,
        description: t.description,
        type: t.senderUserId === userId ? 'sent' : 'received',
      })),
    };

    return response;
  }
}
