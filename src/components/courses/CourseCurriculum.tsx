import { styles } from "@/app/styles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ICourseData } from "@/types/courses";
import { CirclePlay } from "lucide-react";

const CourseCurriculum = ({ courseData }: { courseData: ICourseData[] }) => {
  //calculate section count
  const sectionCounts: Record<string, number> = {};
  courseData?.map((data) => {
    if (sectionCounts[data.videoSection]) {
      sectionCounts[data.videoSection] += 1;
    } else {
      sectionCounts[data.videoSection] = 1;
    }
  });
  const uniqueSections = Object.keys(sectionCounts);

  return (
    <div className={cn(styles.layout, styles.paddingY, "bg-muted ")}>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-semibold font-siliguri lg:text-2xl md:text-xl text-lg">
          কোর্স কারিকুলাম
        </h1>
        <div className="flex items-center justify-center text-center gap-6">
          <div className="bg-white text-muted-foreground px-2 py-1 text-lg font-semibold rounded-xl leading-6">
            <h1>{courseData.length}</h1>
            <h2 className="font-noto">লেসন</h2>
          </div>

          <div className="bg-white text-muted-foreground px-2 py-1 text-lg font-semibold rounded-xl leading-6">
            <h1>{uniqueSections.length}</h1>
            <h1 className="font-noto">টপিক</h1>
          </div>
        </div>
      </div>

      <div className="">
        <div className="">
          {uniqueSections.map((section, i) => (
            <Accordion key={i + 10} type="single" collapsible className="">
              <AccordionItem value={`item-${i}`} className="mb-5 border-none">
                <AccordionTrigger className="lg:shadow-md shadow-sm bg-white px-4 hover:no-underline">
                  <div className=" flex items-center gap-8">
                    <h1>{section}</h1>
                    <h2 className="text-primary">
                      {sectionCounts[section]} লেসন
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  {courseData
                    .filter((item) => item.videoSection === section)
                    .map((item, index) => (
                      <ul className="" key={index}>
                        <div>
                          <div className="flex items-center gap-4 my-5">
                            <CirclePlay className="text-primary" size={20} />
                            <li>{item.videoTitle}</li>
                          </div>
                          <Separator className="bg-primary opacity-20" />
                        </div>
                      </ul>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;
