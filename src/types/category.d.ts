export interface ICateogry {
  _id: string;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICourseSubcategory {
  courses?: [
    {
      name: string;
      slug: string;
      thumbnail: string;
      _id: string;
    },
  ];
  name: string;
  slug: string;
  _id: string;
}
[];

export interface ISubCategory {
  _id: string;
  name: string;
  slug: string;
}

export type ICategorySubcategory = {
  name: string;
  slug: string;
  _id: string;
  subcategory?: {
    name: string;
    slug: string;
    _id: string;
  }[];
}[];
