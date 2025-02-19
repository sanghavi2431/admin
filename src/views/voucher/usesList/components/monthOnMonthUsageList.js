import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortedColumn, setTableData } from "../store/dataSlice";
import { getVoucher_Usage } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import { useLocation } from "react-router-dom";
import { DoubleSidedImage } from "@/components/shared";
import { isEmpty } from "lodash";

import UsersDeleteConfirmation from "./usersDeleteConfirmation";
import ExportConfirmation from "./exportConfirmation";
function UsageTable() {
  const dispatch = useDispatch();
  let { pageIndex, pageSize, sort, query, total, voucher_code_id, filterType } =
    useSelector((state) => state.voucherusesList.data.tableData);
  const loading = useSelector((state) => state.voucherusesList.data.loading);
  const data = useSelector(
    (state) => state.voucherusesList.data.voucherUsageList
  );
  const location = useLocation();
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  voucher_code_id = id;
  const tableData = useMemo(
    () => ({
      pageIndex,
      pageSize,
      sort,
      query,
      total,
      voucher_code_id,
      filterType,
    }),
    [pageIndex, pageSize, sort, query, total, voucher_code_id, filterType]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData, voucher_code_id, filterType]);

  const fetchData = () => {
    if (loading) return;
    dispatch(
      getVoucher_Usage({
        pageIndex,
        pageSize,
        sort,
        query,
        voucher_code_id,
        filterType,
      })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Corporate Name",
        accessor: "corporate_name",
        Cell: (props) => {
          let { corporate_name } = props.row.original;

          return (
            <div className="flex   justify-start align-end">
              {corporate_name}
            </div>
          );
        },
      },
      {
        Header: "Subscription Name",
        accessor: "sub_name",
        Cell: (props) => {
          let { sub_name } = props.row.original;

          return (
            <div className="flex   justify-start align-end">{sub_name}</div>
          );
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        Cell: (props) => {
          const { mobile } = props.row.original;
          return <div className="flex   justify-start align-end">{mobile}</div>;
        },
      },

      {
        Header: "Redemption Date",
        accessor: "redemption_date",
        Cell: (props) => {
          let { redemption_date } = props.row.original;
          if (redemption_date != null) {
            let datetime = redemption_date
              .split("T")
              .join(" ")
              .split(".")
              .splice(0, 1);
            return <div className="flex w-30 ">{datetime}</div>;
          }
          return redemption_date;
        },
      },
      {
        Header: "Expiry Date",
        accessor: "expiry_date",
        Cell: (props) => {
          let { expiry_date } = props.row.original;
          if (expiry_date != null) {
            let datetime = expiry_date
              .split("T")
              .join(" ")
              .split(".")
              .splice(0, 1);
            return <div className="flex w-30 ">{datetime}</div>;
          }
          return expiry_date;
        },
      },
      {
        Header: "Month",
        accessor: "month",
        Cell: (props) => {
          let { month } = props.row.original;

          return <div className="flex   justify-start align-end">{month}</div>;
        },
      },
      {
        Header: "Usage",
        accessor: "count",
        Cell: (props) => {
          let { count } = props.row.original;

          return <div className="flex   justify-start align-end">{count}</div>;
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
      {!loading && !isEmpty(data) ? (
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
          <UsersDeleteConfirmation />
          <ExportConfirmation />
        </>
      ) : (
        <div></div>
      )}
      {!loading && isEmpty(data) && (
        <div className="h-full flex flex-col items-center justify-start">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No Users found!"
          />
          <h3 className="mt-8">No Users found!</h3>
        </div>
      )}
    </>
  );
}
export default UsageTable;
