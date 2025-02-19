import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortedColumn,
  setTableData,
  get_Subscription_Report,
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

function SubscriptionReportTable() {
  const dispatch = useDispatch();
  let columns;
  const { pageIndex, pageSize, sort, query, total, filterType } = useSelector(
    (state) => state.subscriptionReportList.data.tableData
  );
  const loading = useSelector(
    (state) => state.subscriptionReportList.data.loading
  );
  const data = useSelector(
    (state) => state.subscriptionReportList.data.subscriptionReportList
  );
  const subscriptionType = useSelector(
    (state) => state.subscriptionReportList.data.subscriptionType
  );
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total, filterType }),
    [pageIndex, pageSize, sort, query, total, filterType]
  );
  let type = "purchase_date";
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query]);

  const fetchData = () => {
    if (loading) return;
    dispatch(
      get_Subscription_Report({ pageIndex, pageSize, sort, query, filterType })
    );
  };

  let subscriptionColumns = useMemo(
    () => [
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
        Header: "Unique Customer Code  (REFERAL CODE)",
        accessor: "unique_customer_code",
        sortable: true,
        Cell: (props) => {
          const { unique_customer_code } = props.row.original;
          return <div className="flex w-28 ">{unique_customer_code || "NA"}</div>;
        },
      },
      {
        Header: "Trx No.",
        accessor: "trx_no",
        sortable: true,
        Cell: (props) => {
          const { trx_no } = props.row.original;
          return <div className="flex w-32 ">{trx_no || "NA"}</div>;
        },
      },

      {
        Header: "PURCHASE DATE",
        accessor: "purchase_date",
        sortable: true,
        Cell: (props) => {
          let { purchase_date } = props.row.original;
          if (purchase_date != null) {            
            // let purchasedatetime = purchase_date
            //   .split("T")
            //   .join(" ")
            //   .split(".")
            //   .splice(0, 1);
            return <div className="flex w-14 ">{timestampToLocalTime(purchase_date) || "NA"}</div>;
          }
          return purchase_date;
        },
      },
      {
        Header: "Amount Paid",
        accessor: "amount_paid",
        sortable: true,
        Cell: (props) => {
          const { amount_paid } = props.row.original;
          return <div className="flex w-14 ">{amount_paid || "NA"}</div>;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        sortable: true,
        Cell: (props) => {
          const { type } = props.row.original;
          return <div className="flex w-20 ">{type || "NA"}</div>;
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
            return <div className="flex w-24 ">{timestampToLocalTime(expiry_date) || "NA"}</div>;
          }
          return expiry_date;
        },
      },
      {
        Header: "Insurance",
        accessor: "is_insurance_available",
        sortable: true,
        Cell: (props) => {
          const { is_insurance_available } = props.row.original;
          return <div className="flex w-14 ">{is_insurance_available || "NA"}</div>;
        },
      },
      {
        Header: "Document Uploaded",
        accessor: "is_document_uploaded",
        Cell: (props) => {
          const { is_document_uploaded } = props.row.original;
          return <div className="flex w-14 ">{is_document_uploaded || "NA"}</div>;
        },
      },
      {
        Header: "Subscription Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;
          return (
            <div className="flex items-center  h-16 gap-2">
              <span
                className={`capitalize font-semibold ${statusColor[status].textClass}`}
              >
                {statusColor[status].label || "NA"}
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  let voucherColumns = useMemo(
    () => [
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
        Header: "Corporate ID",
        accessor: "corporate_id",
        sortable: true,
        Cell: (props) => {
          const { corporate_id } = props.row.original;
          return <div className="flex w-20 ">{corporate_id || "NA"}</div>;
        },
      },
      {
        Header: "Unique Customer Code  (REFERAL CODE)",
        accessor: "unique_customer_code",
        sortable: true,
        Cell: (props) => {
          const { unique_customer_code } = props.row.original;
          return <div className="flex w-28 ">{unique_customer_code || "NA"}</div>;
        },
      },
      {
        Header: "Applied Date",
        accessor: "applied_date",
        sortable: true,
        Cell: (props) => {
          let { purchase_date } = props.row.original;
          if (purchase_date != null) {
            // let purchasedatetime = purchase_date
            //   .split("T")
            //   .join(" ")
            //   .split(".")
            //   .splice(0, 1);
            return <div className="flex w-14 ">{timestampToLocalTime(purchase_date) || "NA"}</div>;
          }
          return purchase_date;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        sortable: true,
        Cell: (props) => {
          const { type } = props.row.original;
          return <div className="flex w-20 ">{type || "NA"}</div>;
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
            return <div className="flex w-24 ">{timestampToLocalTime(expiry_date) || "NA"}</div>;
          }
          return expiry_date;
        },
      },
      {
        Header: "Document Uploaded",
        accessor: "is_document_uploaded",
        Cell: (props) => {
          const { is_document_uploaded } = props.row.original;
          return <div className="flex w-14 ">{is_document_uploaded || "NA"}</div>;
        },
      },
      {
        Header: "Subscription Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;
          return (
            <div className="flex items-center  h-16 gap-2">
              <span
                className={`capitalize font-semibold ${statusColor[status].textClass}`}
              >
                {statusColor[status].label || "NA"}
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  columns = subscriptionType == "Paid" ? subscriptionColumns : voucherColumns;
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
export default SubscriptionReportTable;
