import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

type Props = {
  title: string;
  info: string | number;
  desc?: string;
};

const InfoCard: FC<Props> = ({ title, info, desc }) => {
  return (
    <Card className="rounded-xl md:max-w-[270px] w-full  bg-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>

      <CardContent>
        <h2 className="font-extrabold text-4xl text-secondary-foreground">
          {info}
        </h2>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
