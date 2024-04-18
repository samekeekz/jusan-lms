import { createSlice } from "@reduxjs/toolkit";

interface CourseState {
  courses: Course[];
}

interface Course {
  id: number;
  name: string;
}

const initialState: CourseState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
});

export default courseSlice.reducer;
