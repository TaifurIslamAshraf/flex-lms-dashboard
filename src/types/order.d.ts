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
