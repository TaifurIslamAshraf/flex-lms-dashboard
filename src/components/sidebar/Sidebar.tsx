"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import Link from "next/link";
// import { useAppSelector } from "@/redux/hooks";

export function Sidebar() {
  const pathname = usePathname();
  // const role = useAppSelector(({ auth }) => auth.user);
  // console.log(role)
  console.log("first")
  console.log("first")
  return (
    <div className="w-[16rem] p-2 h-[calc(100vh-60px)] border-r overflow-y-auto">
      <Link href="/dashboard">
        <span
          className={cn(
            "group flex gap-2 items-center  px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard"
              ? "bg-primary text-white hover:bg-primary hover:text-white"
              : "transparent"
          )}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </span>
      </Link>
      <Link href="/dashboard/courses">
        <span
          className={cn(
            "group flex gap-2 items-center  px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard/courses"
              ? "bg-primary text-white hover:bg-primary hover:text-white"
              : "transparent"
          )}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Courses</span>
        </span>
      </Link>
      <Link href="/dashboard/students">
        <span
          className={cn(
            "group flex gap-2 items-center  px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard/students"
              ? "bg-primary text-white hover:bg-primary hover:text-white"
              : "transparent"
          )}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Students</span>
        </span>
      </Link>
    </div>
  );
}
