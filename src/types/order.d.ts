export type IOrder = {
  _id: string;
  user: string;
  accountType: string;
  accountNumber: string;
  transactionId: string;
  phone: string;
  orderStatus: "Approved" | "Pending" | "Rejected";
  orderedAt: Date;
  items: {
    course: string;
    price: number;
  }[];
};
