import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortedColumn,
  setTableData,
  getWolooRating,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import RowSelection from "@/components/shared/RowSelection";

function UsersTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.WolooRatingList.data.tableData
  );
  const loading = useSelector((state) => state.WolooRatingList.data.loading);
  const data = useSelector((state) => state.WolooRatingList.data.wolooUserRatingList);
  const selectedRows = useSelector(
    (state) => state.WolooRatingList.state.selectedRows
  );

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getWolooRating({ pageIndex, pageSize, sort, query }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-6 ">{id}</div>;
        },
      },
      {
        Header: "User Name",
        accessor: "user_name",
        sortable: true,
        Cell: (props) => {
          const { user_name } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">{user_name}</div>
          );
        },
      },
      {
        Header: "Woloo Name",
        accessor: "woloo_name",
        sortable: true,
        Cell: (props) => {
          const { woloo_name } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">
              {woloo_name}
            </div>
          );
        },
      },
      {
        Header: "Rating",
        accessor: "rating",
        sortable: true,
        Cell: (props) => {
          const { rating } = props.row.original;
          return (
            <div className="flex w-36 justify-start">
              {rating}
            </div>
          );
        },
      },
      {
        Header: "Review Date",
        accessor: "date",
        sortable: true,
        Cell: (props) => {
          const { date } = props.row.original;
          return (
            <div className="flex justify-start">
              {date? date:"-"}
            </div>
          );
        },
      },
      {
        Header: "Review Description",
        accessor: "review_description",
        sortable: true,
        Cell: (props) => {
          const { review_description } = props.row.original;
          return (
            <div className="flex w-36 justify-start">
              {review_description}
            </div>
          );
        },
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        sortable: true,
        Cell: (props) => {
          const { remarks } = props.row.original;
          return (
            <div className="flex w-36 justify-start">
              {remarks}
            </div>
          );
        },
      },
    ],
    []
  );
  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  // const onSelectChange = (value) => {
  //   const newTableData = cloneDeep(tableData);
  //   newTableData.pageSize = Number(value);
  //   newTableData.pageIndex = 1;
  //   dispatch(setTableData(newTableData));
  // };

  const onSort = (sort, sortingColumn) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
    dispatch(setSortedColumn(sortingColumn));
  };
 
  return (
    <>
      <RowSelection
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSort={onSort}
        defaultSelected={selectedRows}
      />
    </>
  );
}
export default UsersTable;
