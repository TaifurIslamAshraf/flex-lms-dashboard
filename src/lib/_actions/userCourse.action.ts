"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { serverApi } from "../utils";

export const getAllUserCourses = async () => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${serverApi}/course-engagement/my-learning`, {
      next: { tags: ["Course"] },
      headers: {
        authorization: `Bearer ${session?.accessToken}`,
      },
    });

    const course = await res.json();

    return course;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUserCourses = async (id: string) => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(
      `${serverApi}/course-engagement/my-learning/${id}`,
      {
        next: { tags: ["Single_Course"] },
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
        },
        cache: "no-store",
      }
    );

    const course = await res.json();

    return course;
  } catch (error) {
    console.log(error);
  }
};

export const userCourseSync = async ({
  course,
  currentVideo,
  completed,
  videosCompleted,
}: {
  course: string;
  currentVideo?: string;
  completed?: boolean;
  videosCompleted?: string[];
}) => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${serverApi}/course-engagement/engagement-sync`, {
      method: "PUT",
      body: JSON.stringify({
        course,
        currentVideo,
        completed,
        videosCompleted,
      }),
      next: { tags: ["Single_Course"] },
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.accessToken}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
