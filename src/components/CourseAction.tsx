"use client";

import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { handleRevalidation } from "@/lib/_actions/revalidateTag";
import { useDeleteCourseMutation } from "@/redux/features/courses/courseApi";
import { FilePenLine, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ICourse } from "@/types/courses";
import { AlertPopup } from "./Dialog/alertDialog";

type Props = {
  course: ICourse;
};

const CourseAction: FC<Props> = ({ course }) => {
  const router = useRouter();

  const [deleteCourse, { isLoading, isSuccess, error }] =
    useDeleteCourseMutation();

  const handleDeleteCourse = async () => {
    const courseId = course?._id;
    await deleteCourse({
      id: courseId,
    });

    await handleRevalidation("User_Course");
    await handleRevalidation("Course");
    router.refresh();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course deleted successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div className="flex items-center gap-5">
      <div className="">
        <Link href={`/courses/${course?.slug}`}>
          <Button size={"icon"}>
            <FilePenLine />
          </Button>
        </Link>
      </div>
      <div className="">
        <AlertPopup actionFunc={handleDeleteCourse}>
          <Button disabled={isLoading} size={"icon"} className="bg-red-400">
            <Trash className="" />
          </Button>
        </AlertPopup>
      </div>
    </div>
  );
};

export default CourseAction;
