// "use client";
// import { useAppSelector } from "@/redux/hooks";
// import { redirect } from "next/navigation";
export default function Home() {
  // const user = useAppSelector((state) => state.auth.user);
  // const dashboardPath = false;
  // if (user?.role === "admin") {
  // if (!dashboardPath) {
  //   redirect("/dashboard");
  // }
  // } else {
  //   redirect("/login");
  // }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <h1>Dashboard Home page</h1>
    </div>
  );
}
