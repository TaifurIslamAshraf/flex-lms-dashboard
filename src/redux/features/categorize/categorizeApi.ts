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
  }),
});

export const {
  useGetSubcategoryByCategoryQuery,
  useGetAllCategoryQuery,
  useGetSubcategoryQuery,
  useGetCategorySubcategoryQuery,
} = categorizeApi;
