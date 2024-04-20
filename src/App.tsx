import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout/RootLayout";
import Courses from "./pages/Courses/Courses";
import CourseCreation from "./pages/CourseCreation/CourseCreation";
import CourseLayout from "./layout/CourseLayout/CourseLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="learn/courses" element={<Courses />} />
        <Route path="courses/create" element={<CourseCreation />} />
      </Route>
      <Route path="/" element={<CourseLayout />}>
        <Route path="course/:id/description" element={<h1>Course</h1>} />
        <Route path="course/:id/content" element={<h1>Course</h1>} />
        <Route path="course/:id/checklist" element={<h1>Course</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
