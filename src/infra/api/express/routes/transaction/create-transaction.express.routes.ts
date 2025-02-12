import { Request, Response } from 'express';
import {
  CreateTransactionInputDto,
  CreateTransactionUsecase,
} from '../../../../../usecases/transaction/create-transaction.usecase';
import { HttpMethod, Route } from '../route';

export type CreateTransactionResponseDto = {
  id: string;
};

export class CreateTransactionRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createTransactionService: CreateTransactionUsecase,
  ) {}

  public static create(createTransactionService: CreateTransactionUsecase) {
    return new CreateTransactionRoute(
      '/transactions',
      HttpMethod.POST,
      createTransactionService,
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { senderUserId, receiverUserId, amount, description } =
        request.body;

      const input: CreateTransactionInputDto = {
        senderUserId,
        receiverUserId,
        amount,
        description,
      };

      const output: CreateTransactionResponseDto =
        await this.createTransactionService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(
    input: CreateTransactionResponseDto,
  ): CreateTransactionResponseDto {
    const response = { id: input.id };
    return response;
  }
}
