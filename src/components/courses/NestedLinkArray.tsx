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
import { cn } from "@/lib/utils";
import { ListPlus, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

interface INestedProps {
  nestedIndex: number;
  form: any;
}

const NestedLinkArray = ({ nestedIndex, form }: INestedProps) => {
  const { fields, append, remove } = useFieldArray({
    name: `courseData.${nestedIndex}.videoResource`,
  });

  const handleLinkDelete = (linkId: string) => {
    const linkIndex = fields.findIndex((link) => link.id === linkId);

    if (linkIndex !== -1) {
      remove(linkIndex);
    }
  };

  const handleAddVideoResource = async (nestedIndex: number) => {
    const isValid = await form.trigger(
      `courseData.${nestedIndex}.videoResource`
    );
    if (isValid) {
      append({
        title: "",
        url: "",
      });
    }
  };

  return (
    <div className="space-y-6">
      {fields.map((link, linkIndex) => (
        <div key={link.id} className="space-y-5">
          <FormField
            control={form.control}
            name={`courseData.${nestedIndex}.videoResource.${linkIndex}.title`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-primary">
                    Link {linkIndex + 1}
                  </FormLabel>
                  <div className="">
                    {linkIndex === 0 ? (
                      <Button
                        className="flex items-center gap-1 text-secondary mb-4"
                        onClick={() => handleAddVideoResource(nestedIndex)}
                        variant={"link"}
                        type="button"
                      >
                        <ListPlus className="cursor-pointer" />
                        <p className="font-semibold">Add new Link</p>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleLinkDelete(link.id)}
                        className={cn("cursor-pointer")}
                        variant={"outline"}
                        size={"icon"}
                      >
                        <Trash size={20} />
                      </Button>
                    )}
                  </div>
                </div>
                <FormControl>
                  <Input placeholder="Enter Link Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`courseData.${nestedIndex}.videoResource.${linkIndex}.url`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter Link Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default NestedLinkArray;
