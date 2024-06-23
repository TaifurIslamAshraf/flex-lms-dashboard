import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

const CourseFormSteps = ({ formStep, setFormStep }: Props) => {
  const FormStepOption = [
    "Course Information",
    "Course Option",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="mb-3">
      <div className="">
        <div className="flex items-center">
          <div className={cn("text-primary font-semibold")}>
            <h1
              className={cn(
                "flex items-center text-base",
                formStep > 0 && "text-green-500",
                formStep === 0 && "text-foreground"
              )}
            >
              <span>Information</span> <ChevronRight size={18} />
            </h1>
          </div>

          <div className={cn("text-primary font-semibold")}>
            <h1
              className={cn(
                "flex items-center text-base",
                formStep > 1 && "text-green-500",
                formStep === 1 && "text-foreground"
              )}
            >
              <span>Option</span> <ChevronRight size={18} />
            </h1>
          </div>

          <div className={cn("text-primary font-semibold")}>
            <h1
              className={cn(
                "flex items-center text-base",
                formStep > 2 && "text-green-500",
                formStep === 2 && "text-foreground"
              )}
            >
              <span>Content</span> <ChevronRight size={18} />
            </h1>
          </div>

          <div className={cn("text-primary font-semibold")}>
            <h1
              className={cn(
                "flex items-center text-base",
                formStep > 3 && "text-green-500",
                formStep === 3 && "text-foreground"
              )}
            >
              <span>Preview</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFormSteps;
