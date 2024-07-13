import BestSelling from "@/components/BestSelling/BestSelling";
import OrderStatus from "@/components/charts/OrderStatus";
import YearlySales from "@/components/charts/YearlySales";
import OverviewCard from "@/components/OverviewCard";
import { cn } from "@/lib/utils";
import { styles } from "../styles";

export default function Home() {
  return (
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
      <OverviewCard />

      <div className="mt-12">
        <OrderStatus />
      </div>

      <div className="mt-12">
        <YearlySales />
      </div>

      <BestSelling />
    </div>
  );
}
