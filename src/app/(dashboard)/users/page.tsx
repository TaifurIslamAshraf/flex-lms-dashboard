import { styles } from "@/app/styles";
import Paginations from "@/components/Paginations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserAction from "@/components/UserAction";
import config from "@/config/config";
import { getAllUsers } from "@/lib/_actions/users.action";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/user";
import { assests } from "@/utilities/assests";
import Image from "next/image";

const Users = async () => {
  const data = await getAllUsers();
  const allUsers = data?.data?.users as IUser[];
  const serverUrl = config?.serverURl;

  return (
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML, "")}>
      <div className="mb-4">
        <h1 className="font-bold text-3xl uppercase">All Users</h1>
      </div>

      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead className="min-w-[100px]">Image</TableHead>
            <TableHead className="min-w-[140px]">Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers &&
            allUsers.map((items) => (
              <TableRow key={items?._id}>
                <TableCell className="font-medium">
                  {items?.avatar ? (
                    <Image
                      src={`${serverUrl}/${items.avatar}`}
                      alt={items.name}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src={assests?.UserPlaceholder}
                      alt={items.name}
                      width={40}
                      height={40}
                    />
                  )}
                </TableCell>
                <TableCell>{items?.name}</TableCell>
                <TableCell>{items?.phone}</TableCell>
                <TableCell>{items?.email}</TableCell>
                <TableCell>
                  <UserAction role={items.role} userId={items?._id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {data?.data && data?.data?.meta?.totalPage > 1 && (
        <Paginations pagination={data?.data?.meta} type="user" />
      )}
    </div>
  );
};

export default Users;
