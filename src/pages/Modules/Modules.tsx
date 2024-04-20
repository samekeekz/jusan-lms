import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useParams } from "react-router-dom";
import { editModules } from "@/store/slices/courseSlice";

const Modules = () => {
  const { id } = useParams();
  const { courses } = useAppSelector((state) => state.course);
  const course = courses.find((course) => course.id === Number(id));
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editedModules, setEditedModules] = useState(course?.modules || []);

  const handleAddModule = () => {
    const newModule = {
      id: editedModules.length + 1,
      module_name: "",
      module_description: "",
      lessons: [
        {
          id: 1,
          lesson_name: "",
        },
      ],
    };
    setEditedModules([...editedModules, newModule]);
  };

  const handleSave = () => {
    dispatch(
      editModules({ courseId: course?.id ?? 0, modules: editedModules })
    );
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

  const handleAddLesson = (moduleId: number) => {
    const updatedModules = editedModules.map((module) => {
      if (module.id === moduleId) {
        const newLesson = {
          id: module.lessons.length + 1,
          lesson_name: "",
        };
        return { ...module, lessons: [...module.lessons, newLesson] };
      }
      return module;
    });
    setEditedModules(updatedModules);
  };

  console.log(editedModules);

  return (
    <div className="flex items-start gap-14">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="font-bold text-3xl leading-6 mb-3">Программа курса</h1>
        <div className="mt-10 max-w-full">
          {editedModules?.length > 0 ? (
            <div className="w-full flex flex-col">
              {editMode ? (
                <div className="w-full flex flex-col gap-9">
                  {editedModules?.map((module) => (
                    <div className="">
                      <div className="flex gap-4">
                        <p className="pt-7 font-bold">{module.id}</p>
                        <div
                          key={module.id}
                          className="w-full border-l-[#FF0000] border-l-[3px] border-[2px] border-solid border-[#D9D9D9] py-6 pl-9 pr-[65px] flex flex-col gap-4"
                        >
                          <div className="border-[#D9D9D9] border-[2px] border-solid rounded-[10px] py-[5px] px-4">
                            <input
                              className="text-lg w-full"
                              type="text"
                              placeholder="Название модуля"
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
                                />
                              </div>
                              {index !== editModules.length - 1 && (
                                <span className="cursor-pointer ">X</span>
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
                                  />
                                </div>
                                <button
                                  className="shrink-0 border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3 mr-[22px]"
                                  onClick={() => handleAddLesson(module.id)}
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
                <div className="flex flex-col gap-4">
                  <button
                    className="self-start flex items-center gap-2 bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
                    onClick={() => setEditMode(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.293 3.293a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM13 5l2-2v2h2l-2 2-2-2zm-1.293 1.293l-8 8-1.586-.586 8-8 1.586.586z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Редактировать содержание</p>
                  </button>
                  {editedModules?.map((module) => (
                    <div key={module.id} className="flex flex-col gap-2">
                      <h2 className="font-bold text-2xl">
                        {module.module_name}
                      </h2>
                      <p>{module.module_description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="self-center w-full h-[640px] flex flex-col justify-center items-center">
              <div className="w-[435px] h-[400px] rounded-[20px] bg-[#D9D9D9] mb-12"></div>
              <p className="mb-16">
                Создайте первый модуль, чтоб добавить уроки
              </p>
              <button
                onClick={handleAddModule}
                className="bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
              >
                + Новый модуль
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 bg-[#D9D9D9] rounded-[20px] px-5 py-4">
        <div className="w-[50px] h-[50px] bg-white rounded-full"></div>
        <div className="flex flex-col">
          <p>Самат Белентбай</p>
          <p className="underline cursor-pointer">Ментор</p>
        </div>
      </div>
    </div>
  );
};

export default Modules;
