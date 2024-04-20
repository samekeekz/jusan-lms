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
      module_name: "New Module",
      module_description: "New Module description",
      lessons: [
        {
          id: 1,
          lesson_name: "Lesson 1",
          lesson_description: "Lesson 1 description",
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
          lesson_name: `Lesson ${module.lessons.length + 1}`,
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
                <div className="w-full flex flex-col gap-4">
                  {editedModules?.map((module) => (
                    <div
                      key={module.id}
                      className="w-full border-[2px] border-solid border-[#D9D9D9] py-6 px-9 flex flex-col gap-2"
                    >
                      <input
                        className="border-[#D9D9D9] border-[2px] border-solid rounded-[10px] py-5 px-4"
                        type="text"
                        value={module.module_name}
                        onChange={(e) =>
                          handleModuleChange(
                            module.id,
                            "module_name",
                            e.target.value
                          )
                        }
                      />
                      <textarea
                        className="border-[#D9D9D9] border-[2px] border-solid rounded-[10px] py-3 px-5"
                        value={module.module_description}
                        onChange={(e) =>
                          handleModuleChange(
                            module.id,
                            "module_description",
                            e.target.value
                          )
                        }
                      />
                      {module.lessons.map((lesson, index) => (
                        <div
                          className="w-full flex flex-col gap-3 relative"
                          key={lesson.id}
                        >
                          <input
                            className="grow border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3"
                            type="text"
                            value={lesson.lesson_name}
                            readOnly
                          />
                          {index !== editModules.length - 1 && (
                            <span className="cursor-pointer absolute top-0 -right-5">
                              X
                            </span>
                          )}

                          {index === module.lessons.length - 1 && (
                            <div className="flex gap-5 w-full">
                              <input
                                className="grow border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3"
                                type="text"
                                value="Введите название урока и нажмите Enter"
                                readOnly
                              />
                              <button
                                className="shrink-0 border-[#D9D9D9] border-[2px] border-solid py-[6px] px-3"
                                onClick={() => handleAddLesson(module.id)}
                              >
                                Add Lesson
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    className="bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
                    onClick={handleAddModule}
                  >
                    Add Module
                  </button>
                  <button
                    className="bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button onClick={() => setEditMode(true)}>
                    Редактировать содержание
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
