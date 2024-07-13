import InfoCard from "@/components/InfoCard";
import { getOverView } from "@/lib/_actions/chart.action";
import { IOverView } from "@/types/chart";

const OverviewCard = async () => {
  const data = await getOverView();
  const overview: IOverView = data?.data;

  return (
    <div className="space-y-6">
      <h1 className="font-semibold text-muted-foreground text-2xl">Overview</h1>
      <div className="md:flex block items-center md:gap-6 md:space-y-0 space-y-4">
        <InfoCard
          title="Total Courses"
          desc="Shows Total number of course"
          info={`${overview.totalCourses} +`}
        />
        <InfoCard
          title="Total Sales"
          desc="Here shows up sales report"
          info={`$${overview.totalSales}`}
        />
        <InfoCard
          title="Students"
          desc="All list of student count"
          info={`${overview.totalUsers} +`}
        />
      </div>
    </div>
  );
};

export default OverviewCard;
