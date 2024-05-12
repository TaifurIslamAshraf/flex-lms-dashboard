import Navbar from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar></Navbar>
      <div className="flex gap-4">
        <Sidebar></Sidebar>
        <div className="border-l w-full h-[calc(100vh-60px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default layout;
