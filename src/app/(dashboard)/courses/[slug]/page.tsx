"use client";

import * as z from "zod";

import { styles } from "@/app/styles";
import ComponentLoader from "@/components/ComponentLoader";
import { LoadingButton } from "@/components/LoaderButton";
import CourseFormSteps from "@/components/courses/CourseFormSteps";
import CourseInfo from "@/components/courses/CourseInfo";
import CoursePreview from "@/components/courses/CoursePreview";
import FormStep1 from "@/components/courses/FormStep1";
import FormStep2 from "@/components/courses/FormStep2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import config from "@/config/config";
import { handleRevalidation } from "@/lib/_actions/revalidateTag";
import { updateCourseFormSchema } from "@/lib/formShemas/createCourse.schema";
import { cn } from "@/lib/utils";
import {
  useSingleCourseByAdminQuery,
  useUpdateCourseMutation,
} from "@/redux/features/courses/courseApi";
import { IAdminCourse } from "@/types/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  params: { slug: string };
}

interface INext {
  validation?: () => boolean;
}

const UpdateCourse: FC<Props> = ({ params }) => {
  const [updateCourse, { isLoading, isSuccess, error }] =
    useUpdateCourseMutation();
  const { data: singleCourse, isLoading: singleCourseIsLoading } =
    useSingleCourseByAdminQuery(params.slug);
  const singleCourseData: IAdminCourse = singleCourse?.data;

  const CourseForm = useForm<z.infer<typeof updateCourseFormSchema>>({
    resolver: zodResolver(updateCourseFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      courseDuration: "",
      category: "",
      subcategory: "",
      details: [{ title: "" }],
      demoUrl: "",
      thumbnail: "",
      benefits: [{ title: "" }],
      prerequistites: [{ title: "" }],
      courseData: [
        {
          videoTitle: "",
          videoDescription: "",
          videoUrl: "",
          videoPlayer: "",
          videoLength: "",
          videoSection: "Untitled Section",
          videoResource: [
            {
              title: "",
              url: "",
            },
          ],
        },
      ],
    },
  });
  const [formStep, setFormStep] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>([]);
  const router = useRouter();
  const serverUrl = config.serverURl;

  useEffect(() => {
    if (singleCourseData) {
      CourseForm.reset({
        name: singleCourseData.name,
        thumbnail: `${serverUrl}/${singleCourseData.thumbnail}`,
        description: singleCourseData.description,
        price: singleCourseData.price.toString(),
        estimatedPrice: singleCourseData.estimatedPrice?.toString(),
        tags: singleCourseData.tags,
        level: singleCourseData.level,
        courseDuration: singleCourseData.courseDuration,
        category: singleCourseData.category,
        subcategory: singleCourseData.subcategory,
        details: singleCourseData.details,
        demoUrl: singleCourseData.demoUrl,
        benefits: singleCourseData.benefits,
        prerequistites: singleCourseData.prerequistites,
        courseData: singleCourseData.courseData.map((course) => ({
          ...course,
          videoLength: course.videoLength?.toString(), // Convert to string
          videoResource: course.videoResource?.map((link) => ({
            ...link,
          })),
        })),
      });
    }
  }, [singleCourseData, CourseForm, singleCourseData?.courseData, serverUrl]);

  const handleCourseUpdate = async (
    data: z.infer<typeof updateCourseFormSchema>
  ) => {
    const formData = new FormData();

    // Append simple fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("estimatedPrice", data.estimatedPrice || "");
    formData.append("tags", data.tags);
    formData.append("courseDuration", data.courseDuration);
    formData.append("category", data?.category ? data?.category : "");
    formData.append("subcategory", data?.subcategory ? data?.subcategory : "");
    formData.append("level", data.level);
    formData.append("demoUrl", data.demoUrl);

    // Append file separately
    if (data.thumbnailFile) {
      formData.append("thumbnail", data.thumbnailFile);
    }

    data.benefits.forEach((benefit, index) => {
      formData.append(`benefits[${index}][title]`, benefit.title);
    });

    data.prerequistites.forEach((prerequisite, index) => {
      formData.append(`prerequistites[${index}][title]`, prerequisite.title);
    });

    data.details.forEach((detail, index) => {
      formData.append(`details[${index}][title]`, detail.title);
    });

    data.courseData.forEach((course, index) => {
      formData.append(`courseData[${index}][videoTitle]`, course.videoTitle);
      formData.append(
        `courseData[${index}][videoDescription]`,
        course.videoDescription
      );
      formData.append(`courseData[${index}][videoUrl]`, course.videoUrl);
      formData.append(
        `courseData[${index}][videoSection]`,
        course.videoSection
      );
      formData.append(`courseData[${index}][videoPlayer]`, course.videoPlayer);
      formData.append(`courseData[${index}][videoLength]`, course.videoLength);

      if (course.videoResource) {
        course.videoResource.forEach((link, linkIndex) => {
          formData.append(
            `courseData[${index}][videoResource][${linkIndex}][title]`,
            link.title
          );
          formData.append(
            `courseData[${index}][videoResource][${linkIndex}][url]`,
            link.url
          );
        });
      }
    });

    // Send the request
    await updateCourse({
      payload: formData,
      id: singleCourseData?._id,
    });

    await handleRevalidation("User_Course");
    await handleRevalidation("Course");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Update Successfull");
      router.push("/courses");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess, router]);

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handlePrevClick = () => {
    if (formStep > 0 && formStep <= 3) {
      setFormStep(formStep - 1);
    }
  };

  const handleNextClick = () => {
    if (formStep >= 0 && formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  return (
    <>
      {singleCourseIsLoading ? (
        <ComponentLoader />
      ) : (
        <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
          <CourseFormSteps formStep={formStep} setFormStep={setFormStep} />
          <Card className="max-w-[900px] w-full py-5 bg-secondary">
            <CardContent className="">
              <Form {...CourseForm}>
                <form onSubmit={CourseForm.handleSubmit(handleCourseUpdate)}>
                  {formStep === 0 && (
                    <CourseInfo
                      handleNextClick={handleNextClick}
                      handlePrevClick={handlePrevClick}
                      form={CourseForm}
                    />
                  )}
                  {formStep === 1 && (
                    <FormStep1
                      handleNextClick={handleNextClick}
                      handlePrevClick={handlePrevClick}
                      form={CourseForm}
                    />
                  )}
                  {formStep === 2 && (
                    <FormStep2
                      handleNextClick={handleNextClick}
                      handlePrevClick={handlePrevClick}
                      form={CourseForm}
                      isCollapsed={isCollapsed}
                      onCollapseToggle={handleCollapseToggle}
                    />
                  )}
                  {formStep === 3 && (
                    <CoursePreview
                      handleNextClick={handleNextClick}
                      handlePrevClick={handlePrevClick}
                      form={CourseForm}
                    />
                  )}
                  {formStep === 3 &&
                    (isLoading ? (
                      <LoadingButton className="w-full" />
                    ) : (
                      <Button type="submit" className="w-full">
                        Submit
                      </Button>
                    ))}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default UpdateCourse;
