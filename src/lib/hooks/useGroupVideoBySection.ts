import { ICourseData } from "@/types/courses";

//calculate section count

type SectionedVideos = Record<string, ICourseData[]>;

const useGroupVideoBySection = (courseData: ICourseData[]): SectionedVideos => {
  return courseData?.reduce((sections: SectionedVideos, video) => {
    if (!sections[video.videoSection]) {
      sections[video.videoSection] = [];
    }

    sections[video.videoSection].push(video);

    return sections;
  }, {});
};

export default useGroupVideoBySection;
