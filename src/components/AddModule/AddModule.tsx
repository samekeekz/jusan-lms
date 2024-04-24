import React from "react";

interface AddModuleProps {
  handleAddFirstModule: () => void;
}

const AddModule: React.FC<AddModuleProps> = ({ handleAddFirstModule }) => {
  return (
    <div className="self-center w-full h-[640px] flex flex-col justify-center items-center">
      <div className="w-[435px] h-[400px] rounded-[20px] bg-[#D9D9D9] mb-12"></div>
      <p className="mb-16">Создайте первый модуль, чтоб добавить уроки</p>
      <button
        onClick={handleAddFirstModule}
        className="bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]"
      >
        + Новый модуль
      </button>
    </div>
  );
};

export default AddModule;
