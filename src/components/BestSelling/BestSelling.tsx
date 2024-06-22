import { Card } from "@/components/ui/card";
import config from "@/config/config";
import { getBestSellingCourses } from "@/lib/_actions/course.action";
import { IBestSellingCourse } from "@/types/courses";
import Image from "next/image";

const BestSelling = async () => {
  const data = await getBestSellingCourses();

  const courses: IBestSellingCourse[] = data?.data;

  return (
    <div>
      <h1 className="font-extrabold text-muted-foreground text-2xl mt-10 mb-6">
        Best Selling
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8">
        {courses &&
          courses?.map((course) => (
            <Card
              className="lg:max-w-[330px] md:w-full w-full rounded-xl"
              key={course?._id}
            >
              <Image
                src={`${config.serverURl}/${course?.thumbnail}`}
                alt={course?.name}
                width={330}
                height={100}
                className="rounded-t-xl lg:max-w-[330px] md:w-full w-full"
              />
              <div className="p-4 space-y-2">
                <h1 className="font-medium">{course?.name}</h1>
                <h2>
                  <span className="font-semibold text-primary">
                    Purchased :{" "}
                  </span>{" "}
                  <span className="text-lg">{course?.totalPurchased}</span>
                </h2>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default BestSelling;
