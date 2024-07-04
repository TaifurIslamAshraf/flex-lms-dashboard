import { getSingleCourse } from "@/lib/_actions/course.action";
import { apiSlice } from "../apiSlice/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    singleCourse: build.query({
      queryFn: async ({ slug }) => {
        try {
          const data = await getSingleCourse(slug);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error?.message } };
        }
      },
    }),

    singleCourseByAdmin: build.query({
      query: (slug: string) => ({
        url: `/course/admin-single-course/${slug}`,
        method: "GET",
      }),
    }),

    createCourse: build.mutation({
      query: ({ payload }) => ({
        url: "/course/create-course",
        method: "POST",
        body: payload,
      }),
    }),

    updateCourse: build.mutation({
      query: ({ payload, id }) => ({
        url: `/course/update-course/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteCourse: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/course/delete-course/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSingleCourseQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useSingleCourseByAdminQuery,
  useUpdateCourseMutation,
} = courseApi;
