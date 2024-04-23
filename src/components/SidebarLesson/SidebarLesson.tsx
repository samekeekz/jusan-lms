import Logo from "@/assets/Logo.png";
import { useAppSelector } from "@/hooks/redux";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

const SidebarLesson = () => {
  const { id, moduleId, lessonId } = useParams();
  const pathname = useLocation().pathname;
  const { courses } = useAppSelector((state) => state.course);
  const course = courses.find((course) => course.id === Number(id));
  const module = course?.modules.find(
    (module) => module.id === Number(moduleId)
  );
  const lesson = module?.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );

  return (
    <div className="font-montserrat w-[274px] h-screen shadow-lg flex flex-col bg-[#D9D9D9] rounded-[20px] relative">
      <div className="pt-[60px] px-[57px]">
        <div className="relative shrink-0 w-40 h-20">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-full absolute top-0 left-0"
            />
          </Link>
        </div>
      </div>
      <div className="w-full text-center mt-20">
        <ul className="flex flex-col gap-9 shrink-0 basis-auto">
          {course?.modules.map((module) => (
            <li key={module.id} className="flex flex-col gap-5">
              <h4 className="text-black font-medium text-[20px] leading-5">
                {module.id}. {module.module_name}
              </h4>
              <ul className="flex flex-col gap-2">
                {module.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="text-black font-medium text-[15px] leading-5"
                  >
                    <NavLink
                      to={`/course/${id}/module/${module.id}/lesson/${lesson.id}`}
                      className={`${
                        pathname ===
                        `/course/${id}/module/${module.id}/lesson/${lesson.id}`
                          ? "bg-white"
                          : ""
                      } w-full`}
                    >
                      {module.id}.{lesson.id}. Подглава
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarLesson;
