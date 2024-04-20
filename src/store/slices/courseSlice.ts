// courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseState {
  courses: Course[];
}

export interface Course {
  id: number;
  logo: File;
  video: string;
  course_name: string;
  course_description: string;
  language: string;
  level: string;
  recommended_load: string;
  learn_description: string;
  modules: Module[];
}

interface Module {
  id: number;
  module_name: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  lesson_name: string;
  lesson_description: string;
  video: string;
  quiz: Quiz;
}

interface Quiz {
  id: number;
  question: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  answer: string;
  is_correct: boolean;
}

const initialState: CourseState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse(state, action: PayloadAction<Omit<Course, "id">>) {
      const newCourse: Course = {
        id: state.courses.length + 1,
        ...action.payload,
      };
      state.courses.push(newCourse);
    },
    addModuleToCourse(
      state,
      action: PayloadAction<{ courseId: number; module: Module }>
    ) {
      const { courseId, module } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.modules.push(module);
      }
    },
    addLessonToModule(
      state,
      action: PayloadAction<{
        courseId: number;
        moduleId: number;
        lesson: Lesson;
      }>
    ) {
      const { courseId, moduleId, lesson } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        const module = course.modules.find((m) => m.id === moduleId);
        if (module) {
          module.lessons.push(lesson);
        }
      }
    },
  },
});

const { actions, reducer } = courseSlice;

export const { addCourse, addModuleToCourse, addLessonToModule } = actions;

export default reducer;
