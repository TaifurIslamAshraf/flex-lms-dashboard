import { styles } from "@/app/styles";
import CourseAction from "@/components/ProductAction";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
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
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
      <div className="space-y-6">
        <h1 className="font-semibold text-2xl">All Products</h1>
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
          <table className="border-collapse border-2 border-slate-300 p-4 w-full">
            <thead>
              <tr className="">
                <th className="border-2 border-slate-300 px-4 py-1">Image</th>
                <th className="border-2 border-slate-300 px-4 py-1">Name</th>
                <th className="border-2 border-slate-300 px-4 py-1">Price</th>
                <th className="border-2 border-slate-300 px-4 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses?.map((item: ICourse) => (
                  <tr key={item._id}>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      <Image
                        src={`${serverUrl}/${item?.thumbnail}`}
                        alt={item.name}
                        width={60}
                        height={60}
                      />
                    </td>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      <Link href={`/products/${item?.slug}`}>{item?.name}</Link>
                    </td>

                    <td className="border-2 border-slate-300 px-4 py-2">
                      {item?.price}
                    </td>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      <CourseAction course={item} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* <Paginations type="admin" pagination={products?.pagination} /> */}
      </div>
    </div>
  );
};

export default Courses;
