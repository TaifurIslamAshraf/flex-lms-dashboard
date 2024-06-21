import { ICourseData, IUserSingleCourse } from "@/types/courses";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CourseState {
  currentCourse?: IUserSingleCourse;
  currentVideo?: ICourseData;
  nextVideo?: ICourseData;
  prevVideo?: ICourseData;
}

const initialState: CourseState = {
  currentCourse: undefined,
  currentVideo: undefined,
  nextVideo: undefined,
  prevVideo: undefined,
};

const userCourseSlice = createSlice({
  name: "userCourse",
  initialState,
  reducers: {
    setCurrentCourse(state, action: PayloadAction<IUserSingleCourse>) {
      state.currentCourse = action.payload;
    },
    setCourseNavigation(
      state,
      action: PayloadAction<{
        currentVideo?: ICourseData;
        nextVideo?: ICourseData;
        prevVideo?: ICourseData;
      }>
    ) {
      state.currentVideo = action.payload.currentVideo;
      state.nextVideo = action.payload.nextVideo;
      state.prevVideo = action.payload.prevVideo;
    },
  },
});

export const { setCurrentCourse, setCourseNavigation } =
  userCourseSlice.actions;

export default userCourseSlice.reducer;
