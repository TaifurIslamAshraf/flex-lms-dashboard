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
import { Plus, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

const FormStep1 = ({ handleNextClick, handlePrevClick, form }: Props) => {
  const {
    fields: benefitsField,
    append: benefitsAppend,
    remove: removeBenefits,
  } = useFieldArray({
    name: "benefits",
    control: form.control,
  });

  const {
    fields: prerequistitesFields,
    append: prerequisitesAppend,
    remove: removePrerequisites,
  } = useFieldArray({
    name: "prerequistites",
    control: form.control,
  });

  const {
    fields: detailsField,
    append: detailsAppend,
    remove: removeDetails,
  } = useFieldArray({
    name: "details",
    control: form.control,
  });

  const handleAddBenefits = async () => {
    const isValidbenefits = await form.trigger("benefits");
    if (isValidbenefits) {
      benefitsAppend({ title: "" });
    }
  };

  const handleAddPrerequisites = async () => {
    const isValidPrerequisites = await form.trigger("prerequisites");
    if (isValidPrerequisites) {
      prerequisitesAppend({ title: "" });
    }
  };

  const handleAddDetails = async () => {
    const isValidDetails = await form.trigger("details");
    if (isValidDetails) {
      detailsAppend({ title: "" });
    }
  };

  const NextValidation = async () => {
    const isValid = await form.trigger(["benefits", "prerequisites"]);
    if (isValid) {
      handleNextClick();
    }
  };

  return (
    <div className="space-y-6">
      <div className="">
        <FormLabel className="text-primary">Course Benefits</FormLabel>
        {benefitsField?.map((benefit, index) => (
          <div key={benefit.id} className="mb-4 flex gap-2">
            <div className="grow">
              <FormField
                control={form.control}
                name={`benefits.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Course Benefits"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {index > 0 && (
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => removeBenefits(index)}
              >
                <Trash />
              </Button>
            )}

            {index === 0 && (
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleAddBenefits}
              >
                <Plus size={20} />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="">
        <FormLabel className="text-primary">Course Prerequistites</FormLabel>
        {prerequistitesFields.map((prere, index) => (
          <div key={prere.id} className="mb-4 flex gap-2">
            <div className="grow">
              <FormField
                control={form.control}
                name={`prerequistites.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Course prerequistites"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {index > 0 && (
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => removePrerequisites(index)}
              >
                <Trash />
              </Button>
            )}

            {index === 0 && (
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleAddPrerequisites}
              >
                <Plus size={20} />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="">
        <FormLabel className="text-primary">Course Details</FormLabel>
        {detailsField.map((prere, index) => (
          <div key={prere.id} className="mb-4 flex gap-2">
            <div className="grow">
              <FormField
                control={form.control}
                name={`details.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Course Details"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {index > 0 && (
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => removeDetails(index)}
              >
                <Trash />
              </Button>
            )}

            {index === 0 && (
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleAddDetails}
              >
                <Plus size={20} />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button onClick={handlePrevClick} className="w-[80px]">
          Previous
        </Button>
        <Button onClick={NextValidation} className="w-[60px]">
          Next
        </Button>
      </div>
    </div>
  );
};

export default FormStep1;
