import { apiSlice } from "../apiSlice/apiSlice";

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: ({ payload, accessToken }) => ({
        url: "/order/create-order",
        method: "POST",
        body: payload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = checkoutApi;
