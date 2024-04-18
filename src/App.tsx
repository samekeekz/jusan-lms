import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout/RootLayout";
import Courses from "./pages/Courses/Courses";
import CourseCreation from "./pages/CourseCreation/CourseCreation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="learn/courses" element={<Courses />} />
        <Route path="courses/create" element={<CourseCreation />} />
        <Route path="course/:id" element={<h1>Course</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
