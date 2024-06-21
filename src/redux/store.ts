import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice/apiSlice";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cart/cartSlice";
import userCourseSlice from "./features/usreCourses/userCourseSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    cart: cartSlice,
    userCourse: userCourseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// initialize app

// const initiallize = () => {
//   store.dispatch(
//     apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
//   );

//   store.dispatch(
//     apiSlice.endpoints.userInfo.initiate({}, { forceRefetch: true })
//   );
// };

// initiallize();
