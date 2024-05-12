import StatisticsCard from "./components/StatisticsCard";
import { Button } from "@/components/ui/button";
import BestSellingProducts from "./components/BestSellingProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Oneself",
};

const Dashboard = () => {
  return (
    <div className="space-y-5 w-full px-2">
      <div className="grid grid-cols-4 gap-3">
        <StatisticsCard />
        <StatisticsCard />
        <StatisticsCard />
        <StatisticsCard />
      </div>
      <div className="flex justify-start gap-3">
        <div className="w-2/3 "></div>
        <div className="w-1/3">
          <BestSellingProducts />
          <div>
            <Button>Click me</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
