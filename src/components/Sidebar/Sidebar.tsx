import Logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";
import IconSettings from "@/assets/Vector.svg";

const Sidebar = () => {
  return (
    <div className=" font-montserrat w-[274px] h-screen shadow-lg pt-[60px] pb-11 px-[57px] flex flex-col bg-[#D9D9D9] rounded-[20px]">
      <div className="relative shrink-0 w-40 h-20 mb-[77px]">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-full h-full absolute top-0 left-0"
          />
        </Link>
      </div>
      <ul className="flex flex-col gap-[45px] grow shrink-0 basis-auto">
        <li className="m-0">
          <Link to="/" className="flex items-center h-[30px]">
            <span className="mr-1">
              <div className="w-[30px] h-[30px] bg-white"></div>
            </span>
            <span className="text-[20px] font-medium leading-5 text-black">
              Главная
            </span>
          </Link>
        </li>
        <li className="m-0">
          <Link to="/learn/courses" className="flex items-center h-[30px]">
            <span className="mr-1">
              <div className="w-[30px] h-[30px] bg-white"></div>
            </span>
            <span className="text-[20px] font-medium leading-5 text-black">
              Курсы
            </span>
          </Link>
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

export default Sidebar;
