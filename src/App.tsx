import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout/RootLayout";
import Courses from "./pages/Courses/Courses";
import CourseCreation from "./pages/CourseCreation/CourseCreation";
import CourseLayout from "./layout/CourseLayout/CourseLayout";
import CourseEdit from "./pages/CourseEdit/CourseEdit";
import Modules from "./pages/Modules/Modules";
import Lesson from "./pages/Lesson/Lesson";
import LessonLayout from "./layout/LessonLayout/LessonLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="learn/courses" element={<Courses />} />
      </Route>
      <Route path="/" element={<CourseLayout />}>
        <Route path="course/create" element={<CourseCreation />} />
        <Route path="course/:id/description" element={<CourseEdit />} />
        <Route path="course/:id/content" element={<Modules />} />
      </Route>
      <Route path="/" element={<LessonLayout />}>
        <Route
          path="course/:id/module/:moduleId/lesson/:lessonId"
          element={<Lesson />}
        />
      </Route>
    </Routes>
  );
}

export default App;
