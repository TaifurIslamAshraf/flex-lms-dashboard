"use client";

import config from "@/config/config";
import { useAppSelector } from "@/lib/hooks/useReduxState";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { assests } from "@/utilities/assests";
import { useSession } from "next-auth/react";
import Image from "next/image";

const serverUrl = config.serverURl;

const ProfilePicture = ({
  height = 40,
  width = 40,
}: {
  height?: number;
  width?: number;
}) => {
  const session = useSession();

  const {} = useGetMeQuery({ accessToken: session?.data?.accessToken });
  const { user } = useAppSelector((state) => state.auth);

  const avatar = user?.avatar;

  return (
    <Image
      className="rounded-full object-cover"
      src={avatar ? `${serverUrl}/${avatar}` : assests.DefaultAvatar}
      alt="default avater"
      height={height}
      width={width}
    />
  );
};

export default ProfilePicture;
