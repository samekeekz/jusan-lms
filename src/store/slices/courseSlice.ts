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

export interface Module {
  id: number;
  module_name: string;
  module_description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  language: string;
  lesson_name: string;
  markdown: string;
  steps: Step[];
}

interface Step {
  id: number;
  step_name: string;
  step_description: string;
  step_content: string;
  step_type: "text" | "code";
  step_code: string;
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
      modules: [
        {
          id: 1,
          module_name: "Module 1",
          module_description: "Module 1 description",
          lessons: [
            {
              id: 1,
              lesson_name: "Lesson 1",
              language: "Русский",
              markdown: "",
              steps: [],
            },
            {
              id: 2,
              lesson_name: "Lesson 2",
              language: "Русский",
              markdown: "",
              steps: [],
            },
          ],
        },
        {
          id: 2,
          module_name: "Module 2",
          module_description: "Module 2 description",
          lessons: [
            {
              id: 3,
              lesson_name: "Lesson 3",
              language: "Русский",
              markdown: "",
              steps: [],
            },
            {
              id: 4,
              lesson_name: "Lesson 4",
              language: "Русский",
              markdown: "",
              steps: [],
            },
          ],
        },
      ],
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
    editLesson(
      state,
      action: PayloadAction<{
        courseId: number;
        moduleId: number;
        lessonId: number;
        updatedLesson: Partial<Lesson>;
      }>
    ) {
      const { courseId, moduleId, lessonId, updatedLesson } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        const module = course.modules.find((m) => m.id === moduleId);
        if (module) {
          const lessonIndex = module.lessons.findIndex(
            (lesson) => lesson.id === lessonId
          );
          if (lessonIndex !== -1) {
            module.lessons[lessonIndex] = {
              ...module.lessons[lessonIndex],
              ...updatedLesson,
            };
          }
        }
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
  editLesson,
} = actions;

export default reducer;
