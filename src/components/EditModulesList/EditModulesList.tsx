import { Module } from "@/store/slices/courseSlice";
import React from "react";

interface EditModulesListProps {
  editedModules: Module[];
  moduleInputRef: React.RefObject<HTMLInputElement>;
  handleModuleChange: (moduleId: number, field: string, value: string) => void;
  handleLessonChange: (
    moduleId: number,
    lessonIndex: number,
    value: string
  ) => void;
  handleDeleteLesson: (moduleId: number, lessonIndex: number) => void;
  handleAddLesson: (moduleId: number, lessonName: string) => void;
  handleAddModule: () => void;
  handleSave: () => void;
  lessonName: string;
  setLessonName: React.Dispatch<React.SetStateAction<string>>;
}

const EditModulesList: React.FC<EditModulesListProps> = ({
  editedModules,
  moduleInputRef,
  handleModuleChange,
  handleLessonChange,
  handleDeleteLesson,
  handleAddLesson,
  handleAddModule,
  handleSave,
  lessonName,
  setLessonName,
}) => {
  return (
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
                    handleModuleChange(module.id, "module_name", e.target.value)
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
                  onClick={() => handleAddLesson(module.id, lessonName)}
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
                        handleLessonChange(module.id, index, e.target.value)
                      }
                    />
                  </div>
                  {index !== module.lessons.length && (
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDeleteLesson(module.id, index)}
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
                      onClick={() => handleAddLesson(module.id, lessonName)}
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
  );
};

export default EditModulesList;
