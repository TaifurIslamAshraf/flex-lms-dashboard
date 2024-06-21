export interface ICateogry {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseSubcategory {
  courses?: [
    {
      name: string;
      slug: string;
      thumbnail: string;
      _id: string;
    }
  ];
  name: string;
  slug: string;
  _id: string;
}
[];

export interface ISubCategory {
  category: string;
  createdAt: string;
  _id: string;
  name: string;
  slug: string;
  updatedAt: string;
  _v: number;
}
