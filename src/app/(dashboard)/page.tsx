import BestSelling from "@/components/BestSelling/BestSelling";
import InfoCard from "@/components/InfoCard";
import { cn } from "@/lib/utils";
import { styles } from "../styles";

export default function Home() {
  return (
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
      <div className="space-y-6">
        <h1 className="font-extrabold text-muted-foreground text-2xl">
          Overview
        </h1>
        <div className="md:flex block items-center md:gap-6 md:space-y-0 space-y-4">
          <InfoCard title="Total Courses" info="4" />
          <InfoCard title="Most Purchased" info="6" />
        </div>
      </div>

      <BestSelling />
    </div>
  );
}
