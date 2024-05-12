"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  setLimit,
  // setTotalPage,
} from "@/redux/features/pagination/PaginationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useEffect } from "react";

const Show = () => {
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector(({ pagination }) => pagination);

  // console.log("totalPage", meta);

  // useEffect(() => {
  //   dispatch(setTotalPage(meta));
  // }, [meta, dispatch]);

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <span>Show</span>
      <Select onValueChange={(v) => dispatch(setLimit(parseInt(v)))}>
        <SelectTrigger className="w-[60px] h-[30px] border-primary focus:ring-0">
          <SelectValue placeholder={limit} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Show;
