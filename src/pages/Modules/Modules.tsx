import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useParams } from "react-router-dom";
import { Module, editModules } from "@/store/slices/courseSlice";
import { enqueueSnackbar } from "notistack";
import { UserBadge } from "@/components/UserBadge";
import ModulesList from "@/components/ModulesList/ModulesList";
import AddModule from "@/components/AddModule/AddModule";
import EditModulesList from "@/components/EditModulesList/EditModulesList";

const Modules = () => {
  const { id } = useParams();
  const { courses } = useAppSelector((state) => state.course);
  const course = courses.find((course) => course.id === Number(id));
  const dispatch = useAppDispatch();

  const [lessonName, setLessonName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedModules, setEditedModules] = useState<Module[]>(
    course?.modules || []
  );

  const moduleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && moduleInputRef.current) {
      moduleInputRef.current.focus();
    }
  }, [editMode]);

  const handleAddModule = () => {
    const newModule = {
      id: editedModules.length + 1,
      module_name: "",
      module_description: "",
      lessons: [
        {
          id: 1,
          lesson_name: "",
          language: "Русский",
          markdown: "",
          steps: [],
        },
      ],
    };
    setEditedModules([...editedModules, newModule]);
  };

  const handleSave = () => {
    const modulesWithNonEmptyLessons = editedModules.map((module) => ({
      ...module,
      lessons: module.lessons.filter(
        (lesson) => lesson.lesson_name.trim() !== ""
      ),
    }));

    dispatch(
      editModules({
        courseId: course?.id ?? 0,
        modules: modulesWithNonEmptyLessons,
      })
    );
    enqueueSnackbar("Сохранено", { variant: "success" });

    setEditMode(false);
  };

  const handleModuleChange = (
    moduleId: number,
    field: string,
    value: string
  ) => {
    const updatedModules = editedModules.map((module) => {
      if (module.id === moduleId) {
        return { ...module, [field]: value };
      }
      return module;
    });
    setEditedModules(updatedModules);
  };

  const handleLessonChange = (
    moduleId: number,
    lessonIndex: number,
    value: string
  ) => {
    const updatedModules = editedModules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons.map((lesson, index) => {
          if (index === lessonIndex) {
            return { ...lesson, lesson_name: value };
          }
          return lesson;
        });
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });
    setEditedModules(updatedModules);
  };

  const handleAddLesson = (moduleId: number, lessonName: string) => {
    const updatedModules = editedModules.map((module) => {
      if (module.id === moduleId) {
        const newLesson = {
          id: module.lessons.length + 1,
          lesson_name: lessonName,
          language: "Русский",
          markdown: "",
          steps: [],
        };
        const updatedLessons = [...module.lessons, newLesson];
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });
    setEditedModules(updatedModules);
    setLessonName("");
  };

  const handleDeleteLesson = (moduleId: number, lessonIndex: number) => {
    const updatedModules = editedModules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons
          .filter((_, index) => index !== lessonIndex)
          .map((lesson, index) => ({ ...lesson, id: index + 1 }));
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });
    setEditedModules(updatedModules);
  };

  const handleAddFirstModule = () => {
    handleAddModule();
    setEditMode(true);
  };

  if (!id) return null;

  return (
    <div className="flex items-start gap-14">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="font-bold text-3xl leading-6 mb-3">Программа курса</h1>
        <div className="mt-10 max-w-full">
          {editedModules?.length > 0 ? (
            <div className="w-full flex flex-col">
              {editMode ? (
                <EditModulesList
                  editedModules={editedModules}
                  handleModuleChange={handleModuleChange}
                  handleLessonChange={handleLessonChange}
                  handleAddLesson={handleAddLesson}
                  handleDeleteLesson={handleDeleteLesson}
                  handleSave={handleSave}
                  moduleInputRef={moduleInputRef}
                  handleAddModule={handleAddModule}
                  lessonName={lessonName}
                  setLessonName={setLessonName}
                />
              ) : (
                <ModulesList
                  editedModules={editedModules}
                  setEditMode={setEditMode}
                  courseId={id}
                />
              )}
            </div>
          ) : (
            <AddModule handleAddFirstModule={handleAddFirstModule} />
          )}
        </div>
      </div>
      <UserBadge />
    </div>
  );
};

export default Modules;
