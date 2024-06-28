"use client";

import * as z from "zod";

import { styles } from "@/app/styles";
import { LoadingButton } from "@/components/LoaderButton";
import CourseFormSteps from "@/components/courses/CourseFormSteps";
import CourseInfo from "@/components/courses/CourseInfo";
import CoursePreview from "@/components/courses/CoursePreview";
import FormStep1 from "@/components/courses/FormStep1";
import FormStep2 from "@/components/courses/FormStep2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { courseFormSchema } from "@/lib/formShemas/createCourse.schema";
import { cn } from "@/lib/utils";
import { useCreateCourseMutation } from "@/redux/features/courses/courseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

interface INext {
  validation?: () => boolean;
}

const CreateCourse = () => {
  const CourseForm = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
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
          links: [
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
  const session = useSession();
  const router = useRouter();

  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  const handleCreateCourse = async (data: z.infer<typeof courseFormSchema>) => {
    const formData = new FormData();

    console.log(data?.thumbnailFile);

    await createCourse({
      payload: data,
      accessToken: session.data?.accessToken,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Create Successfull");
      router.replace("/courses");
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
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
      <CourseFormSteps formStep={formStep} setFormStep={setFormStep} />
      <Card className="max-w-[900px] w-full py-5 bg-secondary">
        <CardContent className="">
          <Form {...CourseForm}>
            <form onSubmit={CourseForm.handleSubmit(handleCreateCourse)}>
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
                  <LoadingButton />
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
  );
};

export default CreateCourse;
