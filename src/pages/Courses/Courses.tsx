import CourseList from "@/components/CouseList/CourseList";
import Search from "@/components/ui/Search/Search";
import { useAppSelector } from "@/hooks/redux";
import { Course } from "@/store/slices/courseSlice";
import { useCallback, useEffect, useState } from "react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const courses = useAppSelector((state) => state.course.courses);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const filterCourses = useCallback(
    (query: string) => {
      const filtered = courses.filter(
        (course) =>
          course.course_name.toLowerCase().includes(query.toLowerCase()) ||
          course.course_description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    },
    [courses]
  );

  useEffect(() => {
    filterCourses(searchQuery);
  }, [searchQuery, filterCourses]);

  return (
    <div className="flex items-start gap-14">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="font-bold text-3xl leading-6 mb-3">Курсы</h1>
        {courses.length > 0 && (
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        )}
        <CourseList courses={courses} filteredCourses={filteredCourses} />
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
