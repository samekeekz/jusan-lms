import Logo from "@/assets/Logo.png";
import { useAppSelector } from "@/hooks/redux";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

const SidebarLesson = () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const { courses } = useAppSelector((state) => state.course);
  const course = courses.find((course) => course.id === Number(id));

  const totalSteps = courses.reduce((acc, course) => {
    // Iterate through each module
    course.modules.forEach((module) => {
      // Iterate through each lesson
      module.lessons.forEach((lesson) => {
        // Add the number of steps in the lesson to the accumulator
        acc += lesson.steps.length;
      });
    });
    return acc;
  }, 0);

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
      <div className="px-10 py-10">
        <h2 className="text-black font-medium text-[20px] leading-5 mb-2">
          Программа курса
        </h2>
        <p className="text-[#9D9D9D] font-medium text-[15px] leading-5 mb-4">
          Прогресс по курсу : {course?.score}/{totalSteps}
        </p>
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-700"
            style={{
              width: `${((course?.score ?? 0) / totalSteps) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="w-full text-center">
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
