import { IinstructorInfo } from "./user";

export interface ICourse {
  _id: string;
  instructor: string | any;
  name: string;
  slug: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: string;
  rating: number;
  reviews: any[];
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}

// Benefit interface
interface Benefit {
  title: string;
  _id: string;
}

// Prerequisite interface
interface Prerequisite {
  title: string;
  _id: string;
}

// IReview interface
export interface IReview {
  user: string;
  rating: number;
  comment?: string;
  commentReplies: any[];
}

// IVideoResource interface
export interface IVideoResource {
  title: string;
  url: string;
  _id?: string;
}

// IComment interface
export interface IComment {
  user: string;
  qustion: string;
  qustionReplies: any[];
}

// ICourseData interface
export interface ICourseData {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  contentDrip: boolean;
  _id: string;
  videoResource: IVideoResource[];
  qustions: IComment[];
}

export interface ISingleCourse extends ICourse {
  instructor?: IinstructorInfo;
  details: { title: string; _id: string }[];
  tags: string;
  level: string;
  demoUrl: string;
  benefits: Benefit[];
  prerequistites: Prerequisite[];
  courseDuration: string;
  materialIncludes: any[];
  courseData?: ICourseData[];
}

export type ICategoryCourse = {
  _id: string;
  name: string;
  slug: string;
  courses: Omit<
    ICourse,
    | "description"
    | "createdAt"
    | "updatedAt"
    | "__v"
    | "instructor"
    | "rating"
    | "reviews"
  >[];
};

export type ICardCourse = Omit<
  ICourse,
  | "description"
  | "createdAt"
  | "updatedAt"
  | "__v"
  | "instructor"
  | "rating"
  | "reviews"
>;

export interface ICourseQueryProps {
  page?: string;
  limit?: string;
  category?: string;
  subcategory?: string;
  search?: string;
  price?: string;
  level?: string;
}

export interface IPagination {
  totalPage: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IUserCourses {
  _id: string;
  completed: boolean;
  courseId: string;
  progress: number;
  title: string;
  thumbnail: string;
  slug: string;
  videoDataLength: number;
  completedVideoLength: number;
}

export interface IUserSingleCourse {
  user: string;
  enrolledAt?: Date;
  completed: boolean;
  progress: number;
  videosCompleted: string[];
  currentVideo?: string;
  nextVideo?: string;
  prevVideo?: string;
  course: {
    _id: string;
    instructor: string | any;
    name: string;
    slug: string;
    description: string;
    subcategory: string;
    category: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: string;
    tags: string;
    level: "beginner" | "intermediate" | "expert";
    demoUrl: string;
    details: { title: string; _id: string }[];
    benefits: Benefit[];
    prerequistites: Prerequisite[];
    courseDuration: string;
    materialIncludes: string[];
    reviews: IReview[];
    courseData: ICourseData[];
    rating: number;
    purchased: number;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
  };
}

export interface IBestSellingCourse {
  _id: string;
  thumbnail: string;
  name: string;
  totalPurchased: number;
}
