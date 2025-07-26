import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const FilterDropdown = ({
  label,
  options,
  selected,
  onChange,
  Icon,
  filterOpen,
  setFilterOpen,
  isDisabled = false, 
}) => {
  const [isOpen, setIsOpen] = useState(filterOpen === label);

  const toggleDropdown = () => {
    if (isDisabled) return; 
    if (filterOpen === label) {
      setFilterOpen(null);
    } else {
      setFilterOpen(label);
    }
  };

  useEffect(() => {
    setIsOpen(filterOpen === label);
  }, [filterOpen]);

  return (
    <div
      className={`relative w-full border rounded-custom shadow-custom ${
        isDisabled ? "opacity-70 cursor-not-allowed border border-gray-300" : ""
      }`}
    >
      <button
        type="button"
        className={`w-full flex justify-between items-center gap-2 px-6 py-4 rounded-custom ${
          isDisabled ? "bg-gray-200" : "bg-white"
        }`}
        onClick={toggleDropdown}
        disabled={isDisabled}
      >
        <div className="flex flex-col" style={{ maxWidth: "70%"}}>
          <div className="flex gap-2 items-center mb-2">
            <div className="">
              {Icon && (
                <Icon
                  color="black"
                  className={`h-8 w-8 ${
                    isDisabled ? "bg-gray-400" : "bg-[#02c3de]"
                  } rounded-xl p-1`}
                />
              )}
            </div>
            <p className="text-left text-base font-semibold truncate" style={{ maxWidth: "97%" }}>
              {label}
            </p>
          </div>
          <p className="text-left text-lg truncate" style={{ maxWidth: "95%" }}>
            {selected ? selected.label : "Select..."}
          </p>
        </div>
        <FaChevronDown
          color="black"
          className={`flex-shrink-0 h-10 w-10 p-2 rounded-full ${
            isDisabled ? "bg-gray-400" : "bg-[#02c3de]"
          } transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && !isDisabled && (
        <ul className="absolute w-full max-h-[30vh] mt-2 bg-white rounded-custom shadow-custom overflow-y-auto z-5">
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.value}
                className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(option);
                  setFilterOpen(null);
                }}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-6 py-2">No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;