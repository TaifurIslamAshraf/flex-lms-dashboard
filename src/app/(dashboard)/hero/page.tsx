import { styles } from "@/app/styles";
import CreateLayout from "@/components/CreateLayout";
import { HeroTable } from "@/components/HeroTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML, "")}>
      <div className="">
        <h1 className="font-bold text-3xl uppercase">Layouts</h1>
      </div>
      <Dialog>
        <DialogTrigger className="max-w-[200px] w-full border p-2 rounded-md shadow-sm flex items-center gap-4 justify-center hover:bg-slate-300 transition-all duration-300 font-semibold ml-auto">
          Create Layout <Plus />
        </DialogTrigger>
        <DialogContent className="max-h-[500px] h-full w-full scrollbar-thin">
          <DialogHeader>
            <DialogTitle>Create Layout</DialogTitle>
          </DialogHeader>
          <CreateLayout />
        </DialogContent>
      </Dialog>

      <div className="w-full overflow-auto">
        <HeroTable />
      </div>
    </div>
  );
};

export default page;
