"use client";

import { LoadingButton } from "@/components/LoaderButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import config from "@/config/config";
import { customRevalidateTag } from "@/lib/_actions/revalidateTag";
import { cn } from "@/lib/utils";
import {
  useGetSingleLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import { ILayoutData } from "@/types/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ComponentLoader from "./ComponentLoader";

const layoutFormSchema = z.object({
  title: z
    .string({ required_error: "Title is Required" })
    .min(1, "Title is Required"),
  description: z
    .string({ required_error: "Description is Required" })
    .min(1, "Description is Required"),
  image: z.any({ required_error: "Image is Required" }),
});

type Props = {
  id: string;
};

const UpdateLayout = ({ id }: Props) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const router = useRouter();
  const serverURl = config.serverURl;
  const [updateLayout, { isLoading, error, isSuccess }] =
    useUpdateLayoutMutation();
  const { data, isLoading: isLoadLayout } = useGetSingleLayoutQuery(id);

  const layout = data?.data as ILayoutData;

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

  const handleUpdateLayout = async (data: z.infer<typeof layoutFormSchema>) => {
    const formData = new FormData();

    Object.entries(data)?.forEach(([key, value]) => {
      formData.append(key, value);
    });

    await updateLayout({ id, payload: formData });
    await customRevalidateTag("Layout");
  };

  useEffect(() => {
    form.reset({
      title: layout?.title,
      description: layout?.description,
      image: layout?.image,
    });
    setImagePreview(`${serverURl}/${layout?.image}`);
  }, [form, layout, serverURl]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Layout Create Successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, form, isSuccess]);

  return (
    <Dialog>
      <DialogTrigger className="bg-primary hover:bg-secondary hover:text-primary transition-all shadow-sm text-white p-2 rounded-md">
        <FilePenLine size={20} />
      </DialogTrigger>
      <DialogContent className="max-h-[500px] h-full scrollbar-thin">
        <DialogHeader>
          <DialogTitle>Update Layout</DialogTitle>
        </DialogHeader>
        {isLoadLayout ? (
          <ComponentLoader />
        ) : (
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUpdateLayout)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Layout Name
                      </FormLabel>
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
                        <FormLabel className="text-primary">
                          Layout Image
                        </FormLabel>
                        <FormControl>
                          <Input
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
                  {isLoading ? (
                    <LoadingButton className="w-full" />
                  ) : (
                    <Button type="submit" className="w-full">
                      Create Layout
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLayout;
