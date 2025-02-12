import { ApiExpress } from './infra/api/express/api.express';
import { CreateTransactionRoute } from './infra/api/express/routes/transaction/create-transaction.express.routes';
import { ListDetailsTransactionByUserRoute } from './infra/api/express/routes/transaction/list-details-transaction-by-user.routes';
import { ListDetailsTransactionRoute } from './infra/api/express/routes/transaction/list-details-transaction.express.routes';
import { TransactionRepositoryPrisma } from './infra/repositories/transaction/transaction.repository.prisma';
import { prisma } from './package/prisma/prisma';
import { CreateTransactionUsecase } from './usecases/transaction/create-transaction.usecase';
import { ListDetailsTransactionByUserUsecase } from './usecases/transaction/list-details-transaction-by-user.usecase';
import { ListDetailsTransactionUsecase } from './usecases/transaction/list-details-transaction.usecase';

function main() {
  const aRepository = TransactionRepositoryPrisma.create(prisma);

  // Usecase
  const createTransactionUsecase = CreateTransactionUsecase.create(aRepository);
  const listDetailsTransaction =
    ListDetailsTransactionUsecase.create(aRepository);
  const listDetailsTransactionByUser =
    ListDetailsTransactionByUserUsecase.create(aRepository);

  // Rotas
  const createRoute = CreateTransactionRoute.create(createTransactionUsecase);
  const listDetailsRoute = ListDetailsTransactionRoute.create(
    listDetailsTransaction,
  );
  const listDetailsByUserRoute = ListDetailsTransactionByUserRoute.create(
    listDetailsTransactionByUser,
  );

  const api = ApiExpress.create([
    createRoute,
    listDetailsRoute,
    listDetailsByUserRoute,
  ]);
  const port = 8001;
  api.start(port);
}

main();
