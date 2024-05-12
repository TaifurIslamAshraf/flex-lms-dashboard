import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "../../../public/logo.png";
// import { ModeToggle } from "../ui/ModeToggle";

const Navbar = () => {
 
  return (
  <div className="w-full flex bg-white justify-between items-center  border-b py-2 px-6 top-0 sticky z-10">
      <div className="px-2">
        <Image
          className="w-24 "
          src={logo}
          alt="Some text"
          priority={true}
          placeholder="blur"
        />
      </div>
      <div className="flex items-center gap-2">
        {/* <ModeToggle /> */}
        <span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
