import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";

const userLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default userLayout;
