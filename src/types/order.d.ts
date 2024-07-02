interface Item {
  course: string;
  price: number;
  _id: string;
}

interface UserInfo {
  name: string;
  email: string;
}

export interface IOrder {
  _id: string;
  accountType: string;
  orderStatus: string;
  phone: string;
  items: Item[];
  userInfo: UserInfo;
  orderedAt: Date;
}

export interface IMeta {
  totalPage: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface ISingleOrder {
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  accountType: string;
  accountNumber: string;
  transactionId: string;
  orderStatus: string;
  phone: string;
  items: {
    course: {
      _id: string;
      name: string;
    };
    price: number;
    _id: string;
  }[];
  orderedAt: Date;
  orderNotes?: string;
  __v: number;
}
