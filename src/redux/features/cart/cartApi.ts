import { apiSlice } from "../apiSlice/apiSlice";
import { updateCartItems } from "./cartSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addCart: build.mutation({
      query: ({ courseId, accessToken }) => ({
        url: "/cart/add-to-cart",
        method: "PUT",
        body: {
          courseId,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        console.log();
        dispatch(
          updateCartItems({ cartItems: result?.data?.data?.cartItems?.length })
        );
      },
    }),

    getAllCartItems: build.query({
      query: ({ accessToken }) => ({
        url: "/cart/cart-items",
        method: "GET",

        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;

        dispatch(updateCartItems({ cartItems: result?.data?.data?.length }));
      },
    }),

    removeCart: build.mutation({
      query: ({ courseId, accessToken }) => ({
        url: "/cart/remove-to-cart",
        method: "PUT",
        body: {
          courseId,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(
          updateCartItems({ cartItems: result?.data?.data?.cartItems?.length })
        );
      },
    }),
  }),
});

export const {
  useAddCartMutation,
  useRemoveCartMutation,
  useGetAllCartItemsQuery,
} = cartApi;
