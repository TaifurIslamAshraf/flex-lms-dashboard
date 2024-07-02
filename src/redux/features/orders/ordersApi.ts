import { apiSlice } from "../apiSlice/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: ({
        orderStatus,
        page,
      }: {
        orderStatus?: string;
        page?: string;
      }) => ({
        url: "/order/all-orders",
        method: "GET",
        params: {
          orderStatus,
          page,
        },
        credentials: "include" as const,
      }),
    }),

    getSingleOrder: build.query({
      query: (id: string) => ({
        url: `/order/single-order/${id}`,
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

    updateOrder: build.mutation({
      query: ({ id, orderStatus }: { id: string; orderStatus: string }) => ({
        url: `/order/update-order/${id}`,
        method: "PUT",
        body: {
          orderStatus,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} = ordersApi;
