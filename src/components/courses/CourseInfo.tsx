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
import { useGetCategorySubcategoryQuery } from "@/redux/features/categorize/categorizeApi";
import { ICategorySubcategory, ISubCategory } from "@/types/category";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

const CourseInfo = ({ handleNextClick, handlePrevClick, form }: Props) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<any>("");
  const [subcategory, setSubcategory] = useState<ISubCategory[] | null>(null);
  const thumbnailImg = form.watch("thumbnail");

  const { data } = useGetCategorySubcategoryQuery({});
  const categorySubcategory: ICategorySubcategory[] = data?.data;

  useEffect(() => {
    const selectedCategory = form.watch("category");
    const selectedCategoryData = categorySubcategory?.find(
      (item) => item?._id === selectedCategory
    );

    setSubcategory(selectedCategoryData?.subcategory || null);
  }, [categorySubcategory, form]);

  const handleChangeThumbnail = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();
      render.onload = (e: any) => {
        if (render.readyState === 2 && render.result) {
          form.setValue("thumbnail", (render.result as string) ?? "");
          setThumbnailPreview((render.result as string) ?? "");
        }
      };
      render.readAsDataURL(file);
    }
  };

  const nextValidation = async () => {
    const stepValid = await form.trigger([
      "name",
      "description",
      "price",
      "estimatedPrice",
      "tags",
      "level",
      "demoUrl",
      "thumbnail",
      "category",
      "subcategory",
      "courseDuration",
    ]);

    if (stepValid) {
      handleNextClick();
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter Course Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Description</FormLabel>
            <FormControl>
              <Textarea
                rows={10}
                placeholder="Write Your Course Description"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center justify-between gap-5">
        <div className="grow">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Course Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Course Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grow">
          <FormField
            control={form.control}
            name="estimatedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Estimated Price(Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Estimated Course Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="courseDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Duration</FormLabel>
            <FormControl>
              <Input placeholder="Enter Course Duration" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center justify-between gap-5">
        <div className="grow">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Course Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Next.js,React.js,MERN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grow">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Course Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Beginner, Expart or intermediate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="grow">
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selectedCategory = categorySubcategory?.find(
                      (item) => item?._id === value
                    );
                    setSubcategory(selectedCategory?.subcategory || null);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Course Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categorySubcategory?.map((item: any) => (
                      <SelectItem key={item?._id} value={item?._id}>
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grow">
          <FormField
            name="subcategory"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Subcategory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subcategory &&
                      subcategory?.map((item: any) => (
                        <SelectItem key={item?._id} value={item?._id}>
                          {item?.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="demoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Demo Url</FormLabel>
            <FormControl>
              <Input placeholder="Enter Your Course Demo Url" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="relative">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Course Thumbnail</FormLabel>
              <FormControl>
                <Input
                  onChange={handleChangeThumbnail}
                  className={cn(thumbnailImg ? "min-h-[20vh]" : "min-h-[10vh]")}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {thumbnailImg ? (
          <Image
            src={thumbnailImg}
            height={200}
            width={100}
            className="h-[20vh] w-[20vw] object-contain absolute top-[2rem] right-0"
            alt="thumbnail"
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button onClick={nextValidation} className="w-[60px]">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseInfo;
