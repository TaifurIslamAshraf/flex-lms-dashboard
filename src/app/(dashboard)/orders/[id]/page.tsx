"use client";

import { styles } from "@/app/styles";
import ComponentLoader from "@/components/ComponentLoader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { customRevalidateTag } from "@/lib/_actions/revalidateTag";
import { cn } from "@/lib/utils";
import {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} from "@/redux/features/orders/ordersApi";
import { ISingleOrder } from "@/types/order";

import { FC, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  params: { id: string };
};

const SingleOrder: FC<Props> = ({ params }) => {
  const { isLoading, data, refetch } = useGetSingleOrderQuery(params.id);
  const { refetch: orderStatusRefetch } = useGetAllOrdersQuery({});

  const order = data?.data as ISingleOrder;
  const totalPrice = order?.items?.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);

  const [
    updateOrderStatus,
    { isSuccess, error, isLoading: updateOrderLoading },
  ] = useUpdateOrderMutation();

  const handleChange = async (value: string) => {
    await updateOrderStatus({
      id: params.id,
      orderStatus: value,
    });

    await refetch();
    await orderStatusRefetch();
    await customRevalidateTag("Order_Update");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order Status Updated");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <>
      {isLoading || updateOrderLoading ? (
        <ComponentLoader />
      ) : (
        <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
          <h1 className="font-semibold text-3xl my-4">Order Details</h1>
          <div className="">
            <Card className="py-4">
              <CardContent className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h3>
                      <span className="font-medium ">Order Status:</span>{" "}
                      {order?.orderStatus}
                    </h3>
                  </div>
                  <div className="">
                    <Select onValueChange={(value) => handleChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Order Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />

                <div className="space-y-4">
                  <h2 className="font-semibold text-2xl">Order</h2>
                  <div className="text-lg space-y-1">
                    <h4>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(order?.orderedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h4>
                    <h4>
                      <span className="font-medium">Account Type:</span>{" "}
                      {order?.accountType}
                    </h4>
                    <h4>
                      <span className="font-medium">Transaction Id:</span>{" "}
                      {order?.transactionId}
                    </h4>
                    <h4>
                      <span className="font-medium">Order Note:</span>{" "}
                      {order?.orderNotes}
                    </h4>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h2 className="font-semibold text-2xl">Shipping Info</h2>
                  <div className="text-lg space-y-1">
                    <h4>
                      <span className="font-medium">Name:</span>{" "}
                      {order?.user?.name}
                    </h4>
                    <h4>
                      <span className="font-medium">Phone:</span> {order?.phone}
                    </h4>
                  </div>
                </div>
                <Separator />

                <div className="space-y-4">
                  <h2 className="font-semibold text-2xl">Order Items</h2>

                  <table className="w-full table-auto border-collapse border border-gray-400">
                    <thead>
                      <tr>
                        <th className="border border-gray-400 p-2 text-start">
                          Course Info
                        </th>
                        <th className="border border-gray-400 p-2 text-start">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {order?.items?.map((item) => (
                        <>
                          <tr key={item?._id}>
                            <td className="border border-gray-400 p-2">
                              {item?.course?.name}{" "}
                            </td>
                            <td className="border border-gray-400 p-2">
                              {item?.price}
                            </td>
                          </tr>
                        </>
                      ))}

                      <tr className="font-semibold">
                        <td className="border border-gray-400 p-2">Total</td>
                        <td className="border border-gray-400 p-2">
                          {totalPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleOrder;
