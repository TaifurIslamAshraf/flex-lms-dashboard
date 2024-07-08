"use client";

import { FC, useCallback } from "react";

import ComponentLoader from "@/components/ComponentLoader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";

import { styles } from "@/app/styles";
import OrderAction from "@/components/OrderAction";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IMeta, IOrder } from "@/types/order";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const AllOrders: FC<Props> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = new URLSearchParams(searchParams);
  const defaultOrderStatus = params.get("orderStatus");

  const { isLoading, data, refetch } = useGetAllOrdersQuery({
    orderStatus: params.get("orderStatus") || "",
    page: params.get("page") || "",
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [params]
  );

  const handleChange = (value: string) => {
    if (value === "All") {
      router.push(`/orders`);
    } else {
      router.push(`/orders?orderStatus=${value}`);
    }

    refetch();
  };

  const orders = data?.data?.data as IOrder[];
  const pagination = data?.data?.meta as IMeta;

  return (
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
      <h1 className="font-semibold text-2xl">All Orders</h1>

      {isLoading ? (
        <ComponentLoader />
      ) : (
        <div className="mt-6 space-y-4">
          {orders && (
            <>
              <div className="max-w-[300px] w-full">
                <Select
                  onValueChange={(value) => handleChange(value)}
                  defaultValue={
                    defaultOrderStatus ? (defaultOrderStatus as string) : "All"
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by order status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full overflow-auto">
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">Name</TableHead>
                      <TableHead className="min-w-[140px]">
                        Order Status
                      </TableHead>
                      <TableHead className="min-w-[140px]">
                        Total Amount
                      </TableHead>
                      <TableHead className="min-w-[140px]">
                        Placed Date
                      </TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders &&
                      orders.map((items) => (
                        <TableRow key={items?._id}>
                          <TableCell>{items?.userInfo?.name}</TableCell>
                          <TableCell
                            className={cn(
                              items.orderStatus === "Pending" &&
                                "text-blue-400",
                              items.orderStatus === "Approved" &&
                                "text-yellow-400",
                              items.orderStatus === "Rejected" && "text-red-400"
                            )}
                          >
                            {items?.orderStatus}
                          </TableCell>
                          <TableCell>
                            {items.items?.reduce(
                              (acc, curr) => acc + curr.price,
                              0
                            )}
                          </TableCell>

                          <TableCell>
                            {new Date(items.orderedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            <OrderAction id={items?._id} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center gap-6">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  disabled={pagination.prevPage === null}
                >
                  <Link
                    href={`/orders?${createQueryString(
                      "page",
                      String(pagination.prevPage)
                    )}`}
                  >
                    <ChevronLeft />
                  </Link>
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  disabled={pagination.nextPage === null}
                >
                  <Link
                    href={`/orders?${createQueryString(
                      "page",
                      String(pagination.nextPage)
                    )}`}
                  >
                    <ChevronRight />
                  </Link>
                </Button>
                <p className="text-sm">Total Orders: {orders?.length}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
