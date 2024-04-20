import Logo from "@/assets/Logo.png";
import { Link, NavLink, useParams } from "react-router-dom";
import IconSettings from "@/assets/Vector.svg";
import { useState } from "react";

const SidebarCourse = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(true);

  const { id } = useParams();

  const toggleCoursesDropdown = () => {
    setIsCoursesOpen((prev) => !prev);
  };

  return (
    <div className="font-montserrat w-[274px] h-screen shadow-lg pt-[60px] pb-11 px-[57px] flex flex-col bg-[#D9D9D9] rounded-[20px]">
      <div className="relative shrink-0 w-40 h-20 mb-[77px]">
        <img
          src={Logo}
          alt="Logo"
          className="w-full h-full absolute top-0 left-0"
        />
      </div>
      <ul className="flex flex-col gap-[45px] grow shrink-0 basis-auto">
        <li className="m-0">
          <div
            className="inline-flex items-center gap-1 cursor-pointer"
            onClick={toggleCoursesDropdown}
          >
            <div className="flex items-center h-[30px]">
              <span className="mr-1">
                <div className="w-[30px] h-[30px] bg-white"></div>
              </span>
              <span className="text-[20px] font-medium leading-5 text-black">
                Курсы
              </span>
            </div>
            <span className="cursor-pointer mt-[3px]">
              {isCoursesOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
            </span>
          </div>
          {isCoursesOpen && (
            <ul className="flex flex-col transition-colors duration-200 ease-in-out">
              <li className="pl-[34px] text-[10px] font-medium leading-5 text-black hover:text-[#FF0000]">
                <NavLink
                  to={`/course/${id}/description`}
                  className={({ isActive }) =>
                    [isActive ? "text-[#FF0000]" : ""].join(" ")
                  }
                >
                  Описание
                </NavLink>
              </li>
              <li className="pl-[34px] text-[10px] font-medium leading-5 text-black hover:text-[#FF0000]">
                <NavLink
                  to={`/course/${id}/content`}
                  className={({ isActive }) =>
                    [isActive ? "text-[#FF0000]" : ""].join(" ")
                  }
                >
                  Содержание
                </NavLink>
              </li>
              <li className="pl-[34px] text-[10px] font-medium leading-5 text-black hover:text-[#FF0000]">
                <NavLink
                  to={`/course/${id}/checklist`}
                  className={({ isActive }) =>
                    [isActive ? "text-[#FF0000]" : ""].join(" ")
                  }
                >
                  Чек-лист
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li className="m-0 grow"></li>
        <li className="m-0">
          <Link to="/settings" className="flex items-center h-[30px]">
            <span className="mr-3">
              <img
                src={IconSettings}
                alt="icon-settings"
                className="w-[30px] h-[30px]"
              />
            </span>
            <span className="text-[20px] font-medium leading-5 text-black">
              Настройки
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarCourse;
