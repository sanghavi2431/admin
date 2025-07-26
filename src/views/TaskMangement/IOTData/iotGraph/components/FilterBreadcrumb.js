import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedFilter } from "../store/dataSlice";

const FilterBreadcrumb = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(
    (state) => state.iotData.data.selectedFiltersData
  );

  const removeFilter = (filterKey) => {
    dispatch(removeSelectedFilter({ filterKey }));
  };

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(selectedFilters).map(([filterKey, filterValue]) => (
        <div
          key={filterKey}
          className="flex items-center bg-[#c3ecf1] text-[#00C3DE] rounded-full px-3 py-1 text-sm"
        >
          <span className="font-semibold capitalize">
            {filterKey}: {filterValue}
          </span>
          <button
            onClick={() => removeFilter(filterKey)}
            className="ml-2 text-red-500 hover:text-red-700"
            aria-label={`Remove ${filterKey} filter`}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterBreadcrumb;
