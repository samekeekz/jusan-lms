import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex items-start justify-stretch max-w-[1440px] mx-auto bg-white w-full min-h-screen">
      <Sidebar />
      <div className="pl-[60px] pr-4 pt-[60px] pb-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
