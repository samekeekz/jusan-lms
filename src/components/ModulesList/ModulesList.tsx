import React from "react";
import { Link } from "react-router-dom";
import Pencil from "@/assets/pencil.png";
import { Module } from "@/store/slices/courseSlice";

interface ModulesListProps {
  editedModules: Module[];
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  courseId: string;
}

const ModulesList: React.FC<ModulesListProps> = ({
  editedModules,
  setEditMode,
  courseId,
}) => {
  return (
    <div className="flex flex-col gap-12">
      <button
        className="self-start flex items-center gap-2 bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
        onClick={() => setEditMode(true)}
      >
        <div className="w-[15px] h-[15px]">
          <img className="w-full h-full" src={Pencil} alt="pencil icon" />
        </div>
        <p>Редактировать содержание</p>
      </button>
      <div className="flex flex-col gap-8">
        {editedModules?.map((module) => (
          <div key={module.id} className="w-full flex flex-col">
            <div className="flex border-[#D9D9D9] border-[2px] border-l-[3px] border-l-[#FF0000] border-solid px-4 py-5">
              <h2 className="font-semibold text-[25px] leading-[20px] capitalize">
                <span>{module.id}. </span> {module.module_name}
              </h2>
            </div>
            {module.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="max-w-full ml-[56px] border-t-0 text-[20px] leading-[20px] flex justify-between items-center border-[#D9D9D9] border-[2px] border-solid px-5 py-3"
              >
                <div className="flex items-center gap-1">
                  <p>
                    {module.id}.{lesson.id}.
                  </p>
                  <p>{lesson.lesson_name}</p>
                </div>
                <Link
                  to={`/course/${courseId}/module/${module.id}/lesson/${lesson.id}`}
                  className="cursor-pointer w-[18px] h-[18px]"
                >
                  <img
                    className="w-full h-full"
                    src={Pencil}
                    alt="pencil icon"
                  />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesList;
