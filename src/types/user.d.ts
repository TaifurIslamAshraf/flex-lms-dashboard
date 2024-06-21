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
