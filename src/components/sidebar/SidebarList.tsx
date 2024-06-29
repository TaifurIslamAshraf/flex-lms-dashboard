"use client";

import { cn } from "@/lib/utils";
import { assests } from "@/utilities/assests";
import {
  Layout,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  PlaySquare,
  ShoppingBag,
  Users,
  Video,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfilePicture from "../profile/ProfilePicture";
import { Button } from "../ui/button";

const deshboardMenu = [
  {
    title: "Dashboard",
    path: "/",
    spacing: true,
    icon: <LayoutDashboard size={17} />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <Users size={17} />,
  },

  {
    title: "Courses",
    path: "/courses",
    icon: <PlaySquare size={17} />,
  },
  {
    title: "Create Course",
    path: "/create-course",
    icon: <Video size={17} />,
    spacing: true,
  },

  {
    title: "Category",
    path: "/category",
    icon: <ListOrdered size={17} />,
  },

  {
    title: "Hero",
    path: "/hero",
    icon: <Layout size={17} />,
  },
  {
    title: "Manage Orders",
    path: "/orders",
    spacing: true,

    icon: <ShoppingBag size={17} />,
  },
  // {
  //   title: "Course Analytics",
  //   path: "/CourseAnalytics",

  //   icon: <LineChart size={17} />,
  // },

  // {
  //   title: "Users Analytics",
  //   path: "/usersAnalytics",
  //   icon: <FilePieChart size={17} />,
  // },
];

const SidebarList = ({
  parantClass,
  header = true,
}: {
  parantClass?: string;
  header?: boolean;
}) => {
  const path = usePathname();

  return (
    <div className={cn(parantClass)}>
      {header && (
        <div className="flex items-center justify-between px-1 ">
          <Link href={"/"}>
            <Image src={assests.Logo} width={150} height={150} alt="logo" />
          </Link>
          <div className={cn("my-6 flex items-center justify-between ")}>
            <ProfilePicture />
          </div>
        </div>
      )}

      <div className="menu">
        {deshboardMenu.map((menu, index) => {
          return (
            <nav
              key={index}
              className={cn(
                "hover:bg-muted-foreground hover:text-secondary px-1 rounded-sm transition",
                path === menu.path && "text-secondary bg-muted-foreground"
              )}
            >
              <Link
                href={menu.path}
                className={`
                flex
                items-center
                gap-x-4
                my-1
                px-2
                py-2
                rounded
                ${menu.spacing && "mb-5"}
              `}
              >
                <div className="">{menu.icon}</div>
                <div className={cn("text-sm flex-1")}>{menu.title}</div>
              </Link>
            </nav>
          );
        })}
      </div>
      <Button
        onClick={async () => await signOut()}
        className="w-full my-5 flex items-center gap-4 hover:bg-muted-foreground"
        size={"sm"}
      >
        <span>Log out</span> <LogOut size={15} />
      </Button>
    </div>
  );
};

export default SidebarList;
