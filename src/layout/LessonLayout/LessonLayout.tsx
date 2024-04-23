import SidebarLesson from "@/components/SidebarLesson/SidebarLesson";
import { Outlet } from "react-router-dom";

const LessonLayout = () => {
  return (
    <div className="flex items-start justify-stretch max-w-[1440px] mx-auto bg-white w-full min-h-screen">
      <SidebarLesson />
      <div className="pl-[60px] pr-4 pt-[60px] pb-10 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default LessonLayout;
