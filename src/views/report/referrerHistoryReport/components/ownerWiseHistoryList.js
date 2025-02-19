import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortedColumn,
  setTableData,
  getOwnerWiseHistory,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import { TextEllipsis } from "@/components/shared";
import ExportConfirmation from "./exportConfirmation";

const statusColor = {
  Active: {
    label: "ACTIVE",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  Inactive: {
    label: "INACTIVE",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

function OwnerWiseHistoryTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total, filterType } = useSelector(
    (state) => state.ownerWiseHistoryList.data.tableData
  );
  const loading = useSelector(
    (state) => state.ownerWiseHistoryList.data.loading
  );
  const data = useSelector(
    (state) => state.ownerWiseHistoryList.data.ownerWiseHistoryList
  );
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total, filterType }),
    [pageIndex, pageSize, sort, query, total, filterType]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query]);

  const fetchData = () => {
    if (loading) return;
    dispatch(
      getOwnerWiseHistory({ pageIndex, pageSize, sort, query, filterType })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-10 ">{id || "NA"}</div>;
        },
      },
      {
        Header: "Owner Name",
        accessor: "owner_name",
        sortable: true,
        Cell: (props) => {
          const { owner_name } = props.row.original;
          return <div className="flex w-20 ">{owner_name || "NA"}</div>;
        },
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
        sortable: true,
        Cell: (props) => {
          const { customer_name } = props.row.original;
          return <div className="flex w-10 ">{customer_name || "NA"}</div>;
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        sortable: true,
        Cell: (props) => {
          const { mobile } = props.row.original;
          return <div className="flex w-16 ">{mobile || "NA"}</div>;
        },
      },

      {
        Header: "city",
        accessor: "city",
        sortable: true,
        Cell: (props) => {
          const { city } = props.row.original;
          return <div className="flex w-10 ">{city || "NA"}</div>;
        },
      },
      {
        Header: "pincode",
        accessor: "pincode",
        sortable: true,
        Cell: (props) => {
          const { pincode } = props.row.original;
          return <div className="flex w-4 ">{pincode || "NA"}</div>;
        },
      },
      {
        Header: "address",
        accessor: "address",
        sortable: true,
        Cell: (props) => {
          const { address } = props.row.original;
          return (
            <div className="flex w-32 justify-start">
              <TextEllipsis text={address || "NA"} maxTextCount={40} />
            </div>
          );
        },
      },
      {
        Header: "email",
        accessor: "email",
        sortable: true,
        Cell: (props) => {
          const { email } = props.row.original;
          return <div className="flex w-30 ">{email || "NA"}</div>;
        },
      },
      {
        Header: "Unique Customer Code  (REFERRAL CODE)",
        accessor: "ref_code",
        sortable: true,
        Cell: (props) => {
          const { ref_code } = props.row.original;
          return <div className="flex w-28 ">{ref_code || "NA"}</div>;
        },
      },
      {
        Header: "Subscription Status",
        accessor: "Subscription_status",
        sortable: true,
        Cell: (props) => {
          const { Subscription_status } = props.row.original;
          return (
            <div className="flex items-center  h-16 gap-2">
              <span
                className={`capitalize font-semibold ${statusColor[Subscription_status].textClass}`}
              >
                {statusColor[Subscription_status].label || "NA"}
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
      <ExportConfirmation />
    </>
  );
}
export default OwnerWiseHistoryTable;
