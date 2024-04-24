import { Course } from "@/store/slices/courseSlice";
import { Link } from "react-router-dom";

interface CourseListProps {
  courses: Course[];
  filteredCourses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  filteredCourses,
}) => {
  return (
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
  );
};

export default CourseList;
