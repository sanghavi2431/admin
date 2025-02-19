import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortedColumn,
  setTableData,
  getUserReport,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import { DoubleSidedImage } from "@/components/shared";
import { isEmpty } from "lodash";
import { TextEllipsis } from "@/components/shared";
import ExportConfirmation from "./exportConfirmation";
import timestampToLocalTime from "@/utils/timestampToLocalTime";

const statusColor = {
  Active: {
    label: "ACTIVE",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  Expired: {
    label: "EXPIRED",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

function UserReportTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total, filterType } = useSelector(
    (state) => state.userReportList.data.tableData
  );
  const loading = useSelector((state) => state.userReportList.data.loading);
  const data = useSelector((state) => state.userReportList.data.userReportList);
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
    dispatch(getUserReport({ pageIndex, pageSize, sort, query, filterType }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-10 ">{id || "NA"}</div>;
        },
      },
      {
        Header: "Registration Date",
        accessor: "date_of_registration",
        sortable: true,
        Cell: (props) => {
          let { date_of_registration } = props.row.original;
          if (date_of_registration != null) {
            // let datetime = date_of_registration
            //   .split("T")
            //   .join(" ")
            //   .split(".")
            //   .splice(0, 1);
            return <div className="flex w-20 ">{timestampToLocalTime(date_of_registration) || "NA"}</div>;
          }
          return date_of_registration;
        },
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
        sortable: true,
        Cell: (props) => {
          const { customer_name } = props.row.original;
          return <div className="flex w-20 ">{customer_name || "NA"}</div>;
        },
      },
      {
        Header: "Expiry Date",
        accessor: "expiry_date",
        sortable: true,
        Cell: (props) => {
          let { expiry_date } = props.row.original;
          if (expiry_date != null) {
            // let datetime = expiry_date
            //   .split("T")
            //   .join(" ")
            //   .split(".")
            //   .splice(0, 1);
            return <div className="flex w-20 ">{timestampToLocalTime(expiry_date) || "NA"}</div>;
          }
          return expiry_date;
        },
      },
      {
        Header: "Unique Customer Code  (REFERRAL CODE)",
        accessor: "unique_customer_code",
        sortable: true,
        Cell: (props) => {
          const { unique_customer_code } = props.row.original;
          return <div className="flex w-28 ">{unique_customer_code || "NA"}</div>;
        },
      },
      {
        Header: "Subscription Type",
        accessor: "Subscription_type",
        sortable: true,
        Cell: (props) => {
          const { Subscription_type } = props.row.original;
          return <div className="flex w-10 ">{Subscription_type || "NA"}</div>;
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
export default UserReportTable;
