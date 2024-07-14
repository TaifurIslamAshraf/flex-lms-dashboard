import { styles } from "@/app/styles";
import CourseAction from "@/components/CourseAction";
import Paginations from "@/components/Paginations";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config/config";
import { getAllCourses } from "@/lib/_actions/course.action";
import { cn } from "@/lib/utils";
import { ICourse } from "@/types/courses";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Courses: FC<Props> = async ({ searchParams }) => {
  const data = await getAllCourses(searchParams);
  const courses = data?.data?.data as ICourse[];
  const serverUrl = config.serverURl;

  return (
    <div
      className={cn(
        styles.paddingY,
        styles.paddingX,
        styles.layoutML,
        "overflow-x-hidden"
      )}
    >
      <div className="space-y-6">
        <h1 className="font-semibold text-2xl">All Courses</h1>
        <div className="flex items-center justify-start flex-col gap-3">
          <div className="w-full flex items-center gap-4">
            <Search />

            {searchParams?.search !== undefined && (
              <Link href={"/courses"}>
                <Button disabled={searchParams?.search === undefined}>
                  Clear
                </Button>
              </Link>
            )}
          </div>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Image</TableHead>
                  <TableHead className="min-w-[300px]">Name</TableHead>
                  <TableHead className="min-w-[100px]">Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses &&
                  courses.map((items) => (
                    <TableRow key={items?._id}>
                      <TableCell className="font-medium">
                        <Image
                          src={`${serverUrl}/${items.thumbnail}`}
                          alt={items.name}
                          width={40}
                          height={40}
                        />
                      </TableCell>
                      <TableCell>{items?.name}</TableCell>
                      <TableCell>{items?.price}</TableCell>
                      <TableCell>
                        <CourseAction course={items} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {data?.data && data?.data?.pagination?.totalPage > 1 && (
          <Paginations type="allCourse" pagination={data?.data?.meta} />
        )}
      </div>
    </div>
  );
};

export default Courses;
