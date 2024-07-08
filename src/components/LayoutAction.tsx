"use client";

import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { handleRevalidation } from "@/lib/_actions/revalidateTag";
import { useDeleteLayoutMutation } from "@/redux/features/layout/layoutApi";
import { AlertPopup } from "./Dialog/alertDialog";
import UpdateLayout from "./UpdateLayout";

type Props = {
  id: string;
};

const LayoutAction: FC<Props> = ({ id }) => {
  const router = useRouter();

  const [deleteLaout, { isLoading, isSuccess, error }] =
    useDeleteLayoutMutation();

  const handleDeleteLaout = async () => {
    await deleteLaout(id);
    await handleRevalidation("Layout");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Layout deleted successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div className="flex items-center gap-5">
      <div className="">
        <UpdateLayout id={id} />
      </div>
      <div className="">
        <AlertPopup actionFunc={handleDeleteLaout}>
          <Button disabled={isLoading} size={"icon"} className="bg-red-400">
            <Trash className="" />
          </Button>
        </AlertPopup>
      </div>
    </div>
  );
};

export default LayoutAction;
