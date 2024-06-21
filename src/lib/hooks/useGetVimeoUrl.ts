import { useGetVideoFromVimeoQuery } from "@/redux/features/usreCourses/userCourseApi";
import { getVimeoVideoId } from "../../utilities/getVimeoVideoId";

const useGetVideoUrl = (url?: string) => {
  const videoId = getVimeoVideoId(url) as string;
  const accessToken = process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN as string;
  const { data } = useGetVideoFromVimeoQuery({
    videoId,
    accessToken: accessToken!,
  });

  if (videoId) {
    return data;
  }
};

export default useGetVideoUrl;
