import { Card } from "@/components/ui/card";
import { FC } from "react";

type Props = {
  title: string;
  info: string;
};

const InfoCard: FC<Props> = ({ title, info }) => {
  return (
    <Card className="p-5 rounded-xl text-center md:max-w-[270px] w-full  bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500">
      <h1 className="font-bold tracking-wide text-2xl text-green-200 ">
        {title}
      </h1>
      <h2 className="font-extrabold text-5xl text-background">{info}</h2>
    </Card>
  );
};

export default InfoCard;
