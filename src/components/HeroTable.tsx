import LayoutAction from "@/components/LayoutAction";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config/config";
import { getLayouts } from "@/lib/_actions/layout.action";
import Image from "next/image";
import HeroSelectAction from "./HeroSelectAction";

export async function HeroTable() {
  const layouts = await getLayouts();
  const serverUrl = config.serverURl;

  return (
    <Table>
      <TableCaption>A list of your Layouts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Select</TableHead>
          <TableHead className="">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {layouts &&
          layouts.map((items) => (
            <TableRow key={items._id}>
              <TableCell>
                <HeroSelectAction
                  layout={{ selected: items?.selected, _id: items?._id }}
                />
              </TableCell>
              <TableCell className="font-medium">
                <Image
                  src={`${serverUrl}/${items.image}`}
                  alt={items.title}
                  width={60}
                  height={60}
                />
              </TableCell>
              <TableCell>{items.title}</TableCell>
              <TableCell>
                <LayoutAction key={items?._id} id={items?._id} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
