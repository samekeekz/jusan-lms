import React, { useState } from "react";

interface SingleSelectProps {
  name: string;
  options: string[];
}

const SingleSelect: React.FC<SingleSelectProps> = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const filteredOptions = options.slice(1);

  return (
    <div className="relative">
      <h4>{name}</h4>
      <div
        className="flex items-center justify-between bg-[#D9D9D9] px-4 py-3 rounded cursor-pointer"
        onClick={toggleOptions}
      >
        <span className="font-medium text-[#9D9D9D]">
          {selectedOption || options[0]}
        </span>
        <span className="ml-2 text-white">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="shrink-0 absolute z-10 mt-1 w-full bg-white shadow-lg border rounded">
          {filteredOptions.map((option) => (
            <div
              key={option}
              className="shrink-0 px-4 py-2 cursor-pointer hover:bg-gray-200"
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
