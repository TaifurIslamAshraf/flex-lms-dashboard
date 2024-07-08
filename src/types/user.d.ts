export interface IuserList {
  className?: string;
}
export interface IinstructorInfo {
  _id: string;
  name: string;
  avatar: string;
  __v: number;
  address: string;
  instructor?: {
    title: string;
    description: string;
  };
}

export type Iinstructor = {
  title: string;
  description: string;
};

export type IUser = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "admin" | "user" | "instructor";
  instructor?: Iinstructor;
  avatar?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  district?: string;
  postCode?: string;
  cartItems: string[];
  createdAt: Date;
  updatedAt: Date;
  _v: number;
};
