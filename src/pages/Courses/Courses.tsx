import IconSearch from "@/assets/search.svg";
import { useAppSelector } from "@/hooks/redux";
import { Course } from "@/store/slices/courseSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

// type Course = {
//   id: number;
//   course_name: string;
//   course_description: string;
// };

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const courses = useAppSelector((state) => state.course.courses);

  const courses = [
    {
      id: 1,
      course_name: "Курс по программированию",
      course_description: "Курс по программированию на языке Python",
    },
    {
      id: 2,
      course_name: "Курс по дизайну",
      course_description: "Курс по дизайну на языке Figma",
    },
    {
      id: 3,
      course_name: "Курс по маркетингу",
      course_description: "Курс по маркетингу в социальных сетях",
    },
  ];

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterCourses(e.target.value);
  };

  const filterCourses = (query: string) => {
    const filtered = courses.filter(
      (course) =>
        course.course_name.toLowerCase().includes(query.toLowerCase()) ||
        course.course_description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="flex items-start gap-14">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="font-bold text-3xl leading-6 mb-3">Курсы</h1>
        {courses.length > 0 && (
          <div className="max-w-[778px] w-full flex items-center gap-3 bg-[#D9D9D9] rounded-[10px] px-4 py-[7px]">
            <div className="">
              <img
                className="w-full h-full"
                src={IconSearch}
                alt="icon-search"
              />
            </div>
            <input
              className="bg-transparent border-none text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        )}
        <div className="mt-10 max-w-full">
          {courses.length > 0 ? (
            <div className="flex h-full max-w-full flex-wrap gap-5">
              {(filteredCourses as typeof courses).map((course) => (
                <div
                  key={course.id}
                  className="w-[227px] flex flex-col rounded-[20px] bg-[#D9D9D9] px-[10px] pt-[10px] pb-5"
                >
                  <div className="bg-white w-full h-[120px] rounded-[20px] mb-2"></div>
                  <p className="mb-1 text-[13px] font-bold">
                    {course.course_name}
                  </p>
                  <p className="mb-5 text-[10px] leading-[15px]">
                    {course.course_description}
                  </p>
                  <span className="grow"></span>
                  <Link
                    className="cursor-pointer bg-white px-5 py-0.5 rounded-[20px] font-semibold hover:bg-[#d1cccc] text-[10px] leading-[15px] block mx-auto"
                    to={`/course/${course.id}`}
                  >
                    Перейти
                  </Link>
                </div>
              ))}
              <span className="grow"></span>
              <Link
                to="/courses/create"
                className="bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
              >
                Создать курс
              </Link>
            </div>
          ) : (
            <div className="self-center w-full h-[640px] flex flex-col justify-center items-center">
              <div className="w-[435px] h-[400px] rounded-[20px] bg-[#D9D9D9] mb-12"></div>
              <p className="mb-16">У Вас пока нет курсов, создайте первый</p>
              <Link
                to="/courses/create"
                className="bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
              >
                Создать курс
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 bg-[#D9D9D9] rounded-[20px] px-5 py-4">
        <div className="w-[50px] h-[50px] bg-white rounded-full"></div>
        <div className="flex flex-col">
          <p>Самат Белентбай</p>
          <p className="underline cursor-pointer">Ментор</p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
