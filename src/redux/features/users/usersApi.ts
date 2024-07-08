import { apiSlice } from "../apiSlice/apiSlice";
import { updateUser } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ avatar, accessToken }) => ({
        url: "/users/update-avatar",
        method: "PUT",
        body: avatar,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            updateUser({
              user: result.data?.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUserInfo: builder.mutation({
      query: ({ updatedPayload, accessToken }) => ({
        url: "/users/update-info",
        method: "PUT",
        body: updatedPayload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            updateUser({
              user: result.data?.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateUserRole: builder.mutation({
      query: (payload) => ({
        url: "/users/update-role",
        method: "PUT",
        body: payload,

        credentials: "include",
      }),
    }),
    updateUserPassword: builder.mutation({
      query: ({ oldPassword, newPassword, accessToken }) => ({
        url: "/auth/update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserRoleMutation,
} = userApi;
