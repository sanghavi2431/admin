import { useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooths, setTableData, setSortedColumn } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { DataTable } from "@/components/shared";

const statusColor = {
  true: {
    label: "ACTIVE",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  false: {
    label: "INACTIVE",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

function BoothTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.boothList.data.tableData
  );
  const loading = useSelector((state) => state.boothList.data.loading);
  const data = useSelector((state) => state.boothList.data.boothList);
  const facility_id = useSelector((state) => state.boothList.data.facility_id);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  useEffect(() => {
    // if (facility_id) {
      fetchData();
    // }
  }, [facility_id]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getBooths({ facility_id: facility_id.value }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Booth Name",
        accessor: "booth_name",
        sortable: true,
        Cell: (props) => {
          const { booth_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {facility_id.label
                ? booth_name + " - " + facility_id.label
                : booth_name}
            </div>
          );
        },
      },
      {
        Header: "IOT Device",
        accessor: "",
        sortable: true,
        Cell: (props) => {
          return (
            <div className="flex w-30  justify-start align-end">
              Odour Monitor
            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;

          return (
            <div className="flex h-10 items-center gap-2">
              <span
                className={`capitalize font-semibold ${statusColor[status].textClass}`}
              >
                {statusColor[status].label}
              </span>
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

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort, sortingColumn) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
    dispatch(setSortedColumn(sortingColumn));
  };
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
      />
    </>
  );
}
export default BoothTable;
