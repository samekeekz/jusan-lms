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
  module_description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  lesson_name: string;
}

const initialState: CourseState = {
  courses: [
    {
      id: 1,
      logo: new File([], ""),
      video: "",
      course_name: "Курс по программированию",
      course_description: "Курс по программированию на языке Python",
      language: "Казахский",
      level: "Начинающий",
      recommended_load: "4-5 часов в неделю",
      learn_description: "Курс по программированию на языке Python",
      modules: [],
    },
  ],
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
    editCourse(state, action: PayloadAction<Course>) {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...action.payload };
      }
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
    editModules(
      state,
      action: PayloadAction<{ courseId: number; modules: Module[] }>
    ) {
      const { courseId, modules } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.modules = modules;
      }
    },
  },
});

const { actions, reducer } = courseSlice;

export const {
  addCourse,
  editCourse,
  addModuleToCourse,
  editModules,
  addLessonToModule,
} = actions;

export default reducer;
