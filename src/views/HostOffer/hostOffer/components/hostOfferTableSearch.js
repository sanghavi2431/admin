import React, { useRef } from "react";
import { Input } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getHostOffers, setTableData } from "../store/dataSlice";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";

const HostOfferTableSearch = () => {
  const dispatch = useDispatch();
  const searchInput = useRef();
  const tableData = useSelector((state) => state.hostOfferList.data.tableData);
  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val) {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length > 1) {
      fetchData(newTableData);
    }
    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  }

  const fetchData = (data) => {
    dispatch(setTableData(data));
    dispatch(getHostOffers(data));
  };

  const onEdit = (e) => {
    debounceFn(e.target.value);
  };

  return (
    <Input
      ref={searchInput}
      className="w-full md:w-max"
      size="md"
      placeholder="Search WolooHost Offer"
      suffix={<HiOutlineSearch className="text-lg mr-3" />}
      onChange={onEdit}
    />
  );
};

export default HostOfferTableSearch;