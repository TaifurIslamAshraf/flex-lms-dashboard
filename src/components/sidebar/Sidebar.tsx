import { styles } from "@/app/styles";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { assests } from "@/utilities/assests";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfilePicture from "../profile/ProfilePicture";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  return (
    <>
      <div className="lg:block hidden">
        <SidebarList
          parantClass={`bg-secondary
      h-screen transition-all duration-400 group text-[#1B4242] px-3 overflow-y-auto scrollbar-hide z-40 border-r-2 border-r-blue-400/75 w-72 fixed`}
        />
      </div>
      <div
        className={cn(
          styles.paddingX,
          "lg:hidden flex items-center justify-between bg-secondary shadow-md z-40 w-full fixed top-0 h-[80px]"
        )}
      >
        <Sheet>
          <SheetTrigger className="cursor-pointer" asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent
            className="bg-secondary max-w-[300px] overflow-y-auto scrollbar-thin"
            side={"left"}
          >
            <SidebarList parantClass="text-[#1B4242] mt-5" header={false} />
          </SheetContent>
        </Sheet>

        <Link href={"/"}>
          <Image
            className="md:w-[150px] w-[120px]"
            src={assests.Logo}
            width={150}
            height={150}
            alt="logo"
          />
        </Link>

        <ProfilePicture />
      </div>
    </>
  );
};

export default Sidebar;
