import { apiSlice } from "../apiSlice/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createLayout: build.mutation({
      query: (payload) => ({
        url: `/layout/create-layout`,
        method: "POST",
        body: payload,
        credentials: "include" as const,
      }),
    }),

    deleteLayout: build.mutation({
      query: (id: string) => ({
        url: `/layout/delete-layout/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    updateLayout: build.mutation({
      query: ({ id, payload }: { id: string; payload: Partial<any> }) => ({
        url: `/layout/update-layout/${id}`,
        method: "PUT",
        body: payload,
        credentials: "include" as const,
      }),
    }),

    getSingleLayout: build.query({
      query: (id: string) => ({
        url: `/layout/single-layout/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateLayoutMutation,
  useDeleteLayoutMutation,
  useUpdateLayoutMutation,
  useGetSingleLayoutQuery,
} = layoutApi;
