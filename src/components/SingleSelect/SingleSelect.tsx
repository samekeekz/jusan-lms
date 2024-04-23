import React, { useState } from "react";

interface SingleSelectProps {
  type?: "white" | "black";
  name: string;
  header?: string;
  options: string[];
  selected?: string | null;
  onSelect: (name: string, option: string) => void;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  type = "black",
  name,
  header,
  options,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(name, option);
    setIsOpen(false);
  };

  const filteredOptions = selected ? options : options.slice(1);

  return (
    <div className="relative">
      <h4>{header}</h4>
      <div
        className={`flex items-center justify-between rounded-[10px] cursor-pointer ${
          type === "white"
            ? "bg-white border-[#D9D9D9] pl-6 pr-3 py-2 border-[2px] border-solid text-white"
            : "bg-[#D9D9D9] px-4 py-3"
        }`}
        onClick={toggleOptions}
      >
        <span
          className={`${
            type === "white" ? "text-black" : "text-[#9D9D9D] font-medium"
          }`}
        >
          {selected ? selected : selectedOption ? selectedOption : options[0]}
        </span>
        <span
          className={`ml-2 ${
            type === "white" ? "text-[#D9D9D9]" : "text-white"
          }`}
        >
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border rounded">
          {filteredOptions.map((option) => (
            <div
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelect;
