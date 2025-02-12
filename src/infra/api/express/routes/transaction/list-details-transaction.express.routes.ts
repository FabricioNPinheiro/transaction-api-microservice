import { Request, Response } from 'express';
import {
  ListDetailsTransactionOutputDto,
  ListDetailsTransactionUsecase,
} from '../../../../../usecases/transaction/list-details-transaction.usecase';
import { HttpMethod, Route } from '../route';

export type ListDetailsTransactionResponseDto = {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  amount: string;
  description: string;
};

export class ListDetailsTransactionRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listDetailsTransactionService: ListDetailsTransactionUsecase,
  ) {}

  public static create(
    listDetailsTransactionService: ListDetailsTransactionUsecase,
  ) {
    return new ListDetailsTransactionRoute(
      '/transactions/:id',
      HttpMethod.GET,
      listDetailsTransactionService,
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;

      const output = await this.listDetailsTransactionService.execute({
        id,
      });

      const responseBody = this.present(output);

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
  ): ListDetailsTransactionResponseDto {
    const response: ListDetailsTransactionResponseDto = {
      id: input.id,
      senderUserId: input.senderUserId,
      receiverUserId: input.receiverUserId,
      amount: input.amount,
      description: input.description,
    };

    return response;
  }
}
