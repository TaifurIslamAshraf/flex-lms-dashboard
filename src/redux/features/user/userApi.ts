import baseApi from "@/redux/baseApi/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaffOrAdmin: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-staff-or-admin",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useCreateStaffOrAdminMutation } = userApi;
