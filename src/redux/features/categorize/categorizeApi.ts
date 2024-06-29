import { apiSlice } from "../apiSlice/apiSlice";

export const categorizeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubcategoryByCategory: build.query({
      query: ({ categoryId }) => ({
        url: `/subcategory/get-subcategory-by-category/${categoryId}`,
        method: "GET",
      }),
    }),
    getAllCategory: build.query({
      query: () => ({
        url: "/category/get-all-category",
        method: "GET",
      }),
    }),

    getSubcategory: build.query({
      query: () => ({
        url: "/subcategory/get-all-subcategory",
        method: "GET",
      }),
    }),

    getCategorySubcategory: build.query({
      query: () => ({
        url: "/category/category-subcategory",
        method: "GET",
      }),
    }),

    createCategory: build.mutation({
      query: ({ data }) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    createSubcategory: build.mutation({
      query: ({ data }) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    deleteCategory: build.mutation({
      query: ({ id }) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    deleteSubcategory: build.mutation({
      query: ({ id }) => ({
        url: `/subcategory/delete-subcategory/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetSubcategoryByCategoryQuery,
  useGetAllCategoryQuery,
  useGetSubcategoryQuery,
  useGetCategorySubcategoryQuery,
  useCreateCategoryMutation,
  useCreateSubcategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubcategoryMutation,
} = categorizeApi;
