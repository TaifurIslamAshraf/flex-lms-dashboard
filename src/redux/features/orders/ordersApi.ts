import { apiSlice } from "../apiSlice/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: () => ({
        url: "/order/all-orders",
        method: "GET",

        credentials: "include" as const,
      }),
    }),

    deleteOrder: build.mutation({
      query: (id: string) => ({
        url: `/order/delete-order/${id}`,
        method: "DELETE",

        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useDeleteOrderMutation } = ordersApi;
