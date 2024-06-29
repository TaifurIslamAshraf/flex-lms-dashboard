import Sidebar from "@/components/sidebar/Sidebar";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { styles } from "../styles";

const userLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn(styles.layout)}>
      <Sidebar />
      {children}
    </div>
  );
};

export default userLayout;
