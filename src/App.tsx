import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout/RootLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="learn/courses" element={<h1>Learn Courses</h1>} />
        <Route path="course/:id" element={<h1>Course</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
