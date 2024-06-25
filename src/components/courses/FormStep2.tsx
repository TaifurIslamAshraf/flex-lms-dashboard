"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronDown, Pencil, PlusCircle, Trash } from "lucide-react";
import { useCallback } from "react";
import { FieldValues, useFieldArray } from "react-hook-form";
import NestedLinkArray from "./NestedLinkArray";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
  isCollapsed: boolean[];
  onCollapseToggle: (index: number) => void;
}

interface ICourseContent {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  videoSection: string;
  links: {
    title: string;
    url: string;
  }[];
}

const FormStep2 = ({
  handleNextClick,
  handlePrevClick,
  form,
  isCollapsed,
  onCollapseToggle,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: "courseData",
    control: form.control,
  });

  const courseData = form.watch("courseData");

  const typedFields = fields as FieldValues[];

  const addNewVideoSection = useCallback(async () => {
    const courseDataLength = courseData.length;
    const valid = await form.trigger("courseData");
    if (valid) {
      append({
        videoTitle: "",
        videoDescription: "",
        videoUrl: "",
        videoSection: `Untitled Section ${courseDataLength}`,
        videoPlayer: "",
        videoLength: "",
        links: [
          {
            title: "",
            url: "",
          },
        ],
      });
    }
  }, [courseData.length, form, append]);

  //when click next its tregar validation function
  const NextValidation = async () => {
    const isStepValid = await form.trigger("courseData");
    if (isStepValid) {
      handleNextClick();
    }
  };

  return (
    <div>
      {typedFields?.map((item, index: number) => {
        const isShowVideoSectionInp =
          index === 0 ||
          courseData[index].videoSection !== courseData[index - 1].videoSection;

        return (
          <div key={index + 3} className="bg-white px-6">
            {isShowVideoSectionInp && (
              <div
                className={cn(
                  isShowVideoSectionInp ? "mt-14" : "mt-0",
                  "bg-transparent flex items-center pt-3"
                )}
              >
                <FormField
                  name={`courseData.${index}.videoSection`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className={cn(
                            "outline-none text-xl bg-transparent max-w-[200px] w-full"
                          )}
                          type="text"
                          {...field}
                          placeholder="Video Section Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Pencil />
              </div>
            )}
            <div
              className={cn(
                "flex items-center gap-4 justify-end",
                index > 0 && "pt-5"
              )}
            >
              <Trash
                className={cn(index > 0 ? "cursor-pointer" : "hidden")}
                onClick={() => remove(index)}
              />

              <ChevronDown
                className={cn(
                  isCollapsed[index] ? "rotate-180" : "rotate-0",
                  "cursor-pointer"
                )}
                onClick={() => onCollapseToggle(index)}
              />
            </div>

            <div className="">
              {isCollapsed[index] && (
                <>
                  {courseData[index].videoTitle ? (
                    <p>
                      {index + 1}. {courseData[index].videoTitle}
                    </p>
                  ) : (
                    <p>You Dont have video title</p>
                  )}
                </>
              )}
            </div>

            {!isCollapsed[index] && (
              <div key={item.id} className="space-y-6">
                <FormField
                  control={form.control}
                  name={`courseData.${index}.videoTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Video Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Video Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`courseData.${index}.videoDescription`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Video Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={10}
                          placeholder="Write Your Video Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`courseData.${index}.videoUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Video Url</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Video Url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between gap-5">
                  <div className="grow">
                    <FormField
                      name={`courseData.${index}.videoPlayer`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary">
                            Video Player
                          </FormLabel>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Video Player" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="youtube">
                                Youtube Player
                              </SelectItem>
                              <SelectItem value="vimeo">
                                Vimeo Player
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grow">
                    <FormField
                      control={form.control}
                      name={`courseData.${index}.videoLength`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary">
                            Video Length
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter Video Length (120 minutes)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className={cn()}>
                  <NestedLinkArray nestedIndex={index} form={form} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-10">
        <Button
          className="gap-2 text-center w-full"
          onClick={addNewVideoSection}
          variant={"outline"}
        >
          <PlusCircle />
          <span>Add New Section</span>
        </Button>
      </div>
      <div className="flex items-center justify-end mt-10 gap-6 px-10">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={NextValidation}>Next</Button>
      </div>
    </div>
  );
};

export default FormStep2;
