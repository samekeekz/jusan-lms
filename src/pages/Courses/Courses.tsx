import IconSearch from "@/assets/search.svg";
import { useAppSelector } from "@/hooks/redux";
import { Course } from "@/store/slices/courseSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const courses = useAppSelector((state) => state.course.courses);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <div className="w-full flex flex-col">
              <div className="flex justify-start gap-7 max-w-full flex-wrap">
                {(filteredCourses as typeof courses).map((course) => (
                  <div
                    key={course.id}
                    className="w-[227px] h-[250px] flex flex-col rounded-[20px] bg-[#D9D9D9] px-[10px] pt-[10px] pb-5 overflow-hidden"
                  >
                    <div className="bg-white w-full h-[120px] rounded-[20px] mb-2 flex justify-center items-center">
                      {course.logo && (
                        <img
                          className="max-w-full max-h-full object-contain"
                          key={course.course_name}
                          src={localStorage.getItem(course.course_name) || ""}
                          alt={`Image ${course.logo}`}
                        />
                      )}
                    </div>
                    <p className="mb-1 text-[13px] font-bold">
                      {course.course_name}
                    </p>
                    <p className="mb-5 text-[10px] leading-[15px]">
                      {course.course_description}
                    </p>
                    <span className="grow"></span>
                    <Link
                      className="cursor-pointer bg-white px-5 py-0.5 rounded-[20px] font-semibold hover:bg-[#d1cccc] text-[10px] leading-[15px] block mx-auto"
                      to={`/course/${course.id}/description`}
                    >
                      Перейти
                    </Link>
                  </div>
                ))}
              </div>
              <Link
                to="/course/create"
                className="bg-[#D9D9D9] mt-10 self-center block mx-auto hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
              >
                Создать курс
              </Link>
            </div>
          ) : (
            <div className="self-center w-full h-[640px] flex flex-col justify-center items-center">
              <div className="w-[435px] h-[400px] rounded-[20px] bg-[#D9D9D9] mb-12"></div>
              <p className="mb-16">У Вас пока нет курсов, создайте первый</p>
              <Link
                to="/course/create"
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
