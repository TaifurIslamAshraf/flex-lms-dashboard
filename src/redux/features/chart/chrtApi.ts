import { getOrderStatus, getOrderTrends } from "@/lib/_actions/chart.action";
import { apiSlice } from "../apiSlice/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrderTrends: build.query({
      queryFn: async () => {
        try {
          const result = await getOrderTrends();
          return { data: result };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    getOrderStatus: build.query({
      queryFn: async () => {
        try {
          const result = await getOrderStatus();

          return { data: result };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
  }),
});

export const { useGetOrderTrendsQuery, useGetOrderStatusQuery } = layoutApi;
