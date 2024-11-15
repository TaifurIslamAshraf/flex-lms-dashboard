"use client";

import { Button } from "@/components/ui/button";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/orders/ordersApi";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { AlertPopup } from "./Dialog/alertDialog";

type Props = {
  id: string;
};

const OrderAction: FC<Props> = ({ id }) => {
  const [deleteOrder, { isLoading, error, isSuccess }] =
    useDeleteOrderMutation();
  const { refetch } = useGetAllOrdersQuery({});
  const router = useRouter();

  const handleDeleteOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    await refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order delete successfull");
      router.refresh();
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess, router]);

  return (
    <div className="flex items-center gap-6">
      <Link href={`/orders/${id}`}>
        <Button size={"icon"} variant={"outline"}>
          <Edit size={20} />
        </Button>
      </Link>
      <AlertPopup actionFunc={() => handleDeleteOrder(id)}>
        <Button disabled={isLoading} size={"icon"} variant={"outline"}>
          <Trash2 className="text-red-500" size={20} />
        </Button>
      </AlertPopup>
    </div>
  );
};

export default OrderAction;
