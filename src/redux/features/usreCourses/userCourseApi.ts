import { apiSlice } from "../apiSlice/apiSlice";
import { setCurrentCourse } from "./userCourseSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUserCourse: builder.query({
      query: ({ id, accessToken }: { id: string; accessToken: string }) => ({
        url: `/course-engagement/my-learning/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCurrentCourse(result.data?.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    userCourseSync: builder.mutation({
      query: ({
        course,
        currentVideo,
        completed,
        videosCompleted,
        accessToken,
      }: {
        course: string;
        currentVideo?: string;
        completed?: boolean;
        videosCompleted?: string[];
        accessToken: string;
      }) => ({
        url: `/course-engagement/engagement-sync`,
        method: "PUT",

        body: {
          course,
          currentVideo,
          completed,
          videosCompleted,
        },
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    getVideoFromVimeo: builder.query({
      query: ({
        videoId,
        accessToken,
      }: {
        videoId?: string;
        accessToken: string;
      }) => ({
        url: `https://api.vimeo.com/videos/${videoId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetSingleUserCourseQuery,
  useUserCourseSyncMutation,
  useGetVideoFromVimeoQuery,
} = userApi;
