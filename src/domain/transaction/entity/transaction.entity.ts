export type TransactionProps = {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  amount: string;
  description: string;
};

export class Transaction {
  private constructor(private props: TransactionProps) {}

  public static create(
    senderUserId: string,
    receiverUserId: string,
    amount: string,
    description: string,
  ) {
    return new Transaction({
      id: crypto.randomUUID().toString(),
      senderUserId,
      receiverUserId,
      amount,
      description,
    });
  }

  public static with(props: TransactionProps) {
    return new Transaction(props);
  }

  public get id() {
    return this.props.id;
  }

  public get senderUserId() {
    return this.props.senderUserId;
  }

  public get receiverUserId() {
    return this.props.receiverUserId;
  }

  public get amount() {
    return this.props.amount;
  }

  public get description() {
    return this.props.description;
  }
}
