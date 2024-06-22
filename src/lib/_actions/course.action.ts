"use server";

import config from "@/config/config";
import { ICourseQueryProps } from "@/types/courses";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const serverApi = config.serverApi;

export const getRandomCourses = async () => {
  try {
    const res = await fetch(`${serverApi}/course/random-courses`, {
      next: { tags: ["Course"] },
      cache: "no-store",
    });

    const course = await res.json();

    return course;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomCategoryCourses = async () => {
  try {
    const res = await fetch(`${serverApi}/course/random-category-courses`, {
      next: { tags: ["Course"] },
      cache: "no-store",
    });

    const course = await res.json();

    return course;
  } catch (error) {
    console.log(error);
  }
};

export const getBestSellingCourses = async () => {
  const session = await getServerSession(authOptions);
  try {
    const res = await fetch(`${serverApi}/course/best-selling`, {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${session?.accessToken}`,
      },
      next: { tags: ["Buy_Course"] },
    });

    const course = await res.json();

    return course;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCourse = async (slug: string) => {
  try {
    const res = await fetch(`${serverApi}/course/single-course/${slug}`, {
      next: { tags: ["Course", "Single_Course"] },
    });

    const course = await res.json();
    return course;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourses = async ({
  page = "1",
  limit = "10",
  category = "",
  subcategory = "",
  search = "",
  price = "",
  level = "",
}: ICourseQueryProps) => {
  try {
    const res = await fetch(
      `${serverApi}/course/all-courses?page=${page}&price=${price}&limit=${limit}&category=${category}&subcategory=${subcategory}&search=${search}&level=${level}`,
      {
        next: { tags: ["Course"] },
      }
    );

    const course = await res.json();
    return course;
  } catch (error) {
    console.log(error);
  }
};
