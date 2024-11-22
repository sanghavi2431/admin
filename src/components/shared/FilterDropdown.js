import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const FilterDropdown = ({ label, options, selected, onChange, Icon, filterOpen, setFilterOpen }) => {
  const [isOpen, setIsOpen] = useState(filterOpen === label);

  const toggleDropdown = () => {
    if(filterOpen === label){
      setFilterOpen(null);
    }
    else {
      setFilterOpen(label);
    }
  }

  useEffect(() => {
    setIsOpen(filterOpen === label);
  }
  , [filterOpen]);

  return (
    <div className="relative w-full border rounded-lg shadow-lg">
      <button
        type="button"
        className="w-full flex justify-between items-center gap-4 px-6 py-4 bg-white rounded-lg"
        onClick={toggleDropdown}
      >
        <div className="flex flex-col flex-grow">
          <div className="flex gap-2 items-center mb-2">
          <div className="">
            {/* Render the passed Icon prop */}
            {Icon && <Icon color="black" className="h-8 w-8 bg-[#02c3de] rounded-lg p-1" />}
          </div>
          <p className="text-left text-base font-semibold">{label}</p>
          </div>
          <p className="text-left text-lg truncate" style={{ maxWidth: "70%" }}>
            {selected ? selected.label : "Select..."}
          </p>
        </div>
        <FaChevronDown
          color="black"
          className={`flex-shrink-0 h-10 w-10 p-2 rounded-full bg-[#02c3de] transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul className="absolute w-full max-h-[100px] overflow-y-auto mt-1 bg-white border rounded-lg shadow-lg z-50">
          {options.length > 0 ? options.map((option) => (
            <li
              key={option.value}
              className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option);
                // setIsOpen(false);
                setFilterOpen(null);
              }}
            >
              {option.label}
            </li>
          )) : (
            <li className="px-6 py-4">No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
