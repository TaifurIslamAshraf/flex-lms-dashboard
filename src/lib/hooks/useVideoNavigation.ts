import { setCourseNavigation } from "@/redux/features/usreCourses/userCourseSlice";
import { ICourseData, IUserSingleCourse } from "@/types/courses";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./useReduxState";

function useVideoNavigation(
  course: IUserSingleCourse,
  clickVideo?: ICourseData
) {
  const dispatch = useAppDispatch();

  const [currentVideo, setCurrentVideo] = useState<ICourseData | undefined>(
    clickVideo
  );
  const [nextVideo, setNextVideo] = useState<ICourseData | undefined>(
    undefined
  );
  const [prevVideo, setPrevVideo] = useState<ICourseData | undefined>(
    undefined
  );

  useEffect(() => {
    if (!course || !course.course || !course.course.courseData) return;

    const videoIds = course.course.courseData.map((video) => video._id);
    const completedVideos = course.videosCompleted;
    let currentVideoIndex = -1;

    if (clickVideo) {
      currentVideoIndex = videoIds.indexOf(clickVideo._id);
    } else if (course.currentVideo) {
      currentVideoIndex = videoIds.indexOf(course.currentVideo);
    } else if (completedVideos.length > 0) {
      currentVideoIndex = videoIds.indexOf(
        completedVideos[completedVideos.length - 1]
      );
      if (currentVideoIndex < videoIds.length - 1) {
        currentVideoIndex++;
      }
    } else {
      currentVideoIndex = 0;
    }

    if (currentVideoIndex >= 0 && currentVideoIndex < videoIds.length) {
      setCurrentVideo(course.course.courseData[currentVideoIndex]);
    }

    setNextVideo(
      currentVideoIndex < videoIds.length - 1
        ? course.course.courseData[currentVideoIndex + 1]
        : undefined
    );
    setPrevVideo(
      currentVideoIndex > 0
        ? course.course.courseData[currentVideoIndex - 1]
        : undefined
    );

    dispatch(setCourseNavigation({ currentVideo, nextVideo, prevVideo }));
  }, [
    course,
    course.currentVideo,
    course.videosCompleted,
    currentVideo,
    dispatch,
    clickVideo,
    nextVideo,
    prevVideo,
  ]);

  return { currentVideo, nextVideo, prevVideo };
}

export default useVideoNavigation;
