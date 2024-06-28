import { Button } from "@/components/ui/button";
import { ISingleCourse } from "@/types/courses";
import { Info, ShieldCheck } from "lucide-react";
import Image from "next/image";
import CourseCurriculum from "./CourseCurriculum";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

const CoursePreview = ({ handlePrevClick, handleNextClick, form }: Props) => {
  const course: ISingleCourse = form.watch();
  const thumbnailImg = form.watch("thumbnail");

  return (
    <div>
      <div className="">
        <Image
          src={thumbnailImg}
          height={400}
          width={850}
          className=""
          alt="thumbnail"
        />
        <div className="">
          <h1 className="lg:text-3xl md:text-2xl text-xl tracking-wide font-bold my-5">
            {course?.name}
          </h1>
          <p className="md:text-lg text-base font-noto text-muted-foreground">
            {course?.description}
          </p>
        </div>
        <CourseCurriculum courseData={course?.courseData!} />

        <div className="my-5">
          <h1 className="lg:text-2xl md:text-xl text-lg font-semibold font-siliguri">
            এই কোর্স থেকে কী কী শিখবেন?
          </h1>
          <div className="">
            {course?.benefits?.length > 0 &&
              course?.benefits?.map((benefit) => (
                <div
                  className="flex items-center gap-3 mt-4"
                  key={benefit?._id}
                >
                  <ShieldCheck className="text-primary" size={20} />
                  <h1 className="">{benefit.title}</h1>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-8">
          <h1 className="lg:text-2xl md:text-xl text-lg font-semibold font-siliguri">
            কোর্স রিকুয়ারমেন্ট
          </h1>
          <div className="">
            {course?.prerequistites?.map((items) => (
              <div className="flex items-center gap-3 mt-4" key={items?._id}>
                <Info className="text-primary" size={20} />
                <h1 className="">{items.title}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h1 className="lg:text-2xl md:text-xl text-lg font-semibold font-siliguri">
            কোর্স ডিটেইলস
          </h1>
          <ul className="space-y-5">
            {course?.details?.map((item) => (
              <li
                className="list-disc list-inside font-medium font-noto text-lg"
                key={item?._id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-lg font-semibold">Tags:</h1>

            <h2 className="flex items-center gap-2  text-secondary">
              {course?.tags.split(",").map((item, i) => (
                <span className="bg-primary p-1 rounded-md" key={i * 2}>
                  {item}
                </span>
              ))}
            </h2>
          </div>
          <h1 className="text-black font-semibold text-lg">
            Level: <span className="text-primary">{course?.level}</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button onClick={handlePrevClick} className="w-[80px] mb-4">
          Previous
        </Button>
      </div>
    </div>
  );
};

export default CoursePreview;
