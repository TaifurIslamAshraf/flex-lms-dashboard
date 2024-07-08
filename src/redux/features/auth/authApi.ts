import { apiSlice } from "../apiSlice/apiSlice";
import { loadUser, userLogout } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    logout: build.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogout({}));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    forgotPassword: build.mutation({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email: email },

        credentials: "include",
      }),
    }),
    getAllUsers: build.query({
      query: ({}) => ({
        url: "/user/all-users",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Users"] as any,
    }),

    updateUserRole: build.mutation({
      query: (payload) => ({
        url: "/users/update-role",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["Users"] as any,
    }),

    getMe: build.query({
      query: ({}) => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Users"] as any,

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(loadUser(result?.data?.data));
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useGetMeQuery,
} = authApi;
