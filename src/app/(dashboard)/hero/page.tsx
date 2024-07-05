"use client";

import { styles } from "@/app/styles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const layoutFormSchema = z.object({
  title: z
    .string({ required_error: "Title is Required" })
    .min(1, "Title is Required"),
  description: z
    .string({ required_error: "Description is Required" })
    .min(1, "Description is Required"),
  image: z.any({ required_error: "Image is Required" }),
});

const Layout = () => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<z.infer<typeof layoutFormSchema>>({
    resolver: zodResolver(layoutFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const layoutImage = form.watch("image");

  const handleChangeImage = (e: any) => {
    const file: File = e.target?.files[0];

    if (file) {
      const render = new FileReader();

      render.onload = (e: any) => {
        if (render.readyState === 2 && render.result) {
          setImagePreview((render.result as string) ?? "");
        }
      };
      render.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const handleCreateLayout = (data: z.infer<typeof layoutFormSchema>) => {
    console.log(data);
  };

  return (
    <Card className={cn(styles.paddingY, styles.paddingX, styles.layoutML, "")}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateLayout)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Layout Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Layout Name" {...field} />
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
                <FormLabel className="text-primary">
                  Layout Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Write Your Layout Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Layout Image</FormLabel>
                  <FormControl>
                    <Input
                      required
                      onChange={handleChangeImage}
                      className={cn(
                        layoutImage ? "min-h-[20vh]" : "min-h-[10vh]"
                      )}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imagePreview ? (
              <Image
                src={imagePreview}
                height={200}
                width={100}
                className="h-[20vh] w-[20vw] object-contain absolute top-[2rem] right-0"
                alt="image"
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button type="submit" className="w-full">
              Create Layout
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default Layout;
