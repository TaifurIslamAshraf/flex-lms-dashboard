"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { customRevalidateTag } from "@/lib/_actions/revalidateTag";
import { useUpdateLayoutMutation } from "@/redux/features/layout/layoutApi";
import { ILayoutData } from "@/types/layout";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  layout: {
    selected: boolean;
    _id: string;
  };
};

const HeroSelectAction = ({ layout }: Props) => {
  const [updateLayout, { isLoading, isSuccess, error }] =
    useUpdateLayoutMutation();

  const payload: Partial<ILayoutData> = {
    selected: true,
  };

  const handleSelectChange = async (id: string) => {
    await updateLayout({ id, payload });
    await customRevalidateTag("Layout");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Layout Update Successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div key={layout?._id}>
      <Checkbox
        disabled={isLoading || layout.selected}
        onClick={() => handleSelectChange(layout?._id)}
        checked={layout.selected}
      />
    </div>
  );
};

export default HeroSelectAction;
