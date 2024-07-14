"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customRevalidateTag } from "@/lib/_actions/revalidateTag";
import { useUpdateUserRoleMutation } from "@/redux/features/auth/authApi";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  userId: string;
  role: "admin" | "user" | "instructor" | "superAdmin";
};

const UserAction: FC<Props> = ({ userId, role }) => {
  const [updateUserRole, { isSuccess, error }] = useUpdateUserRoleMutation();

  const handleChangeRole = async (value: string) => {
    await updateUserRole({
      userId: userId,
      role: value,
    });

    await customRevalidateTag("User");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Role update success");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div>
      <div className="max-w-[300px] w-full">
        <Select
          defaultValue={role}
          onValueChange={(value) => handleChangeRole(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Update User Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="superAdmin">Super Admin</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserAction;
