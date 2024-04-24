import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Link, useParams } from "react-router-dom";
import { Module, editModules } from "@/store/slices/courseSlice";
import Pencil from "@/assets/pencil.png";
import { enqueueSnackbar } from "notistack";
import { UserBadge } from "@/components/UserBadge";
import ModulesList from "@/components/ModulesList/ModulesList";
import AddModule from "@/components/AddModule/AddModule";

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
                <div className="w-full flex flex-col gap-9">
                  {editedModules?.map((module, index) => (
                    <div className="">
                      <div className="flex gap-4">
                        <p className="pt-7 font-bold">{module.id}</p>
                        <div
                          key={module.id}
                          className="w-full border-l-[#FF0000] border-l-[3px] border-[2px] border-solid border-[#D9D9D9] py-6 pl-9 pr-[65px] flex flex-col gap-4"
                        >
                          <div className="border-[#D9D9D9] border-[2px] border-solid rounded-[10px] py-[5px] px-4">
                            <input
                              ref={index === 0 ? moduleInputRef : null}
                              className="text-lg w-full"
                              type="text"
                              placeholder="Название модуля"
                              value={module.module_name}
                              onChange={(e) =>
                                handleModuleChange(
                                  module.id,
                                  "module_name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="border-[#D9D9D9] border-[2px] border-solid rounded-[10px] py-[5px] px-4">
                            <textarea
                              className="text-lg w-full"
                              placeholder="Описание модуля"
                              value={module.module_description}
                              onChange={(e) =>
                                handleModuleChange(
                                  module.id,
                                  "module_description",
                                  e.target.value
                                )
                              }
                              rows={1}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="border-[2px] border-t-0 border-solid border-[#D9D9D9] py-4 pl-5 pr-[65px] ml-[67px] max-w-full flex flex-col gap-3 relative">
                        {module.lessons.length === 0 && (
                          <div className="flex gap-3 w-full">
                            <p className="invisible">{module.id}.1</p>
                            <div className="grow shrink-0 border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3">
                              <input
                                className="w-full"
                                type="text"
                                placeholder="Введите название урока и нажмите Enter"
                                onChange={(e) => setLessonName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddLesson(module.id, lessonName);
                                  }
                                }}
                              />
                            </div>
                            <button
                              className="shrink-0 border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3 mr-[22px]"
                              onClick={() =>
                                handleAddLesson(module.id, lessonName)
                              }
                            >
                              + Создать урок
                            </button>
                          </div>
                        )}
                        {module.lessons.map((lesson, index) => (
                          <>
                            <div className="flex items-center gap-3">
                              <p>
                                {module.id}.{lesson.id}
                              </p>
                              <div className="grow shrink-0 border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3">
                                <input
                                  className=""
                                  type="text"
                                  placeholder="Название урока"
                                  value={lesson.lesson_name}
                                  onChange={(e) =>
                                    handleLessonChange(
                                      module.id,
                                      index,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {index !== editModules.length - 1 && (
                                <span
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleDeleteLesson(module.id, index)
                                  }
                                >
                                  X
                                </span>
                              )}
                            </div>
                            {index === module.lessons.length - 1 && (
                              <div className="flex gap-3 w-full">
                                <p className="invisible">
                                  {module.id}.{lesson.id}
                                </p>
                                <div className="grow shrink-0 border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3">
                                  <input
                                    className="w-full"
                                    type="text"
                                    placeholder="Введите название урока и нажмите Enter"
                                    onChange={(e) =>
                                      setLessonName(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddLesson(module.id, lessonName);
                                      }
                                    }}
                                  />
                                </div>
                                <button
                                  className="shrink-0 border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3 mr-[22px]"
                                  onClick={() =>
                                    handleAddLesson(module.id, lessonName)
                                  }
                                >
                                  + Создать урок
                                </button>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    className="self-center bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-8 rounded-[10px]"
                    onClick={handleAddModule}
                  >
                    + Новый Модуль
                  </button>
                  <button
                    className="self-center bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-8 rounded-[10px]"
                    onClick={handleSave}
                  >
                    Сохранить
                  </button>
                </div>
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
