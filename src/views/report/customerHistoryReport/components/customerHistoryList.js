import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortedColumn, setTableData, getCustomerHistory } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import ExportConfirmation from "./exportConfirmation";
import { constants } from "@/constants/woloo.constant";
import dayjs from "dayjs";
import timestampToLocalTime from "@/utils/timestampToLocalTime";

function CustomerHistoryTable() {
  const dispatch = useDispatch();
  // const [expiryRange, setExpiryRange] = useState("");
  const { pageIndex, pageSize, sort, query, total,filterType } = useSelector(
    (state) => state.customerHistory.data.tableData
  );
//   const currentMonth = function () {
//     var date = new Date();
//     var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//     var lastDay = new Date();
//     return [ dayjs(new Date(date.getFullYear(), date.getMonth(), 1)).format("YYYY-MM-DD"),dayjs(new Date()).format("YYYY-MM-DD")];
//   };

//   let newFilterType=cloneDeep(filterType)
//   newFilterType.push({
//     type: "date",
//     column: "created_at",
//     value: currentMonth?.()
// })

  const loading = useSelector((state) => state.customerHistory.data.loading);
  const data = useSelector((state) => state.customerHistory.data.customerHistoryList);
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total,filterType }),
    [pageIndex, pageSize, sort, query, total,filterType]
  );
    const roleId = useSelector((state) => state.auth.user.roleId);


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getCustomerHistory({ pageIndex, pageSize, sort, query,filterType }));
  };

  const columns = useMemo(
    () => [
     
      {
        Header: "Customer Type",
        accessor: "customer_type",
        Cell: (props) => {
          const { woloo_id } = props.row.original;
          return <div className="flex w-20 ">{woloo_id ? "Host" : "End User"}</div>;
        }
      }, 
      {
        Header: "Customer Name",
        accessor: "name",
        Cell: (props) => {
          const { name } = props.row.original;
          return <div className="flex w-20 ">{name || "NA"}</div>;
        }
      }, 
      {
        Header: "Unique Customer Code  (REFERRAL CODE)",
        accessor: "ref_code",
        Cell: (props) => {
          const { ref_code } = props.row.original;
          return <div className="flex w-28 ">{ref_code || "NA"}</div>;
        },
      },
      
      {
        Header: "Points Earned",
        accessor: "cr_sum",
        Cell: (props) => {
          const { cr_sum, value } = props.row.original;
          return <div className="flex w-10 ">{value || "NA"}</div>;
        },
      },
      {
        Header: "Points Source",
        accessor: "type",
        Cell: (props) => {
          const { type } = props.row.original;
          return <div className="flex w-20 ">{type || "NA"}</div>;
        },
      },
      {
        Header: "Cumulative Points",
        accessor: "cum_count",
        Cell: (props) => {
          const { cum_count } = props.row.original;
          return <div className="flex w-10 ">{cum_count || "NA"}</div>;
        },
      },
      {
        Header: "Points Redeemed",
        accessor: "dr_sum",
        Cell: (props) => {
          const { dr_sum } = props.row.original;
          return <div className="flex w-10 ">{dr_sum || "-"}</div>;
        },
      },
      {
        Header: "Pincode",
        accessor: "pincode",
        Cell: (props) => {
          const { pincode } = props.row.original;
          return <div className="flex w-10 ">{pincode || "NA"}</div>;
        },
      },
      {
        Header: "Transaction Date",
        accessor: "created_at",
        Cell: (props) => {
          let { created_at } = props.row.original;
          if(created_at!=null){
          // let datetime = created_at.split("T").join(" ").split(".").splice(0, 1)
          return <div className="flex w-20 ">{timestampToLocalTime(created_at) || "NA"}</div>;
          }
          return created_at
        },
      },
      {
        Header: "Transaction ID",
        accessor: "id",
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-10 ">{id || "NA"}</div>;
        },
      },  
    ],
    []
  );
  const columns_for_host = useMemo(
    () => [
     
      // {
      //   Header: "Customer Name",
      //   accessor: "name",
      //   Cell: (props) => {
      //     const { name } = props.row.original;
      //     return <div className="flex w-20 ">{name}</div>;
      //   }
      // }, 
      // {
      //   Header: "Unique Customer Code  (REFERRAL CODE)",
      //   accessor: "ref_code",
      //   Cell: (props) => {
      //     const { ref_code } = props.row.original;
      //     return <div className="flex w-28 ">{ref_code}</div>;
      //   },
      // },
      
      {
        Header: "Points Earned",
        accessor: "cr_sum",
        Cell: (props) => {
          const { cr_sum, value } = props.row.original;
          return <div className="flex w-10 ">{value || "NA"}</div>;
        },
      },
      {
        Header: "Points Source",
        accessor: "type",
        Cell: (props) => {
          const { type } = props.row.original;
          return <div className="flex w-20 ">{type || "NA"}</div>;
        },
      },
      {
        Header: "Cumulative Points",
        accessor: "cum_count",
        Cell: (props) => {
          const { cum_count } = props.row.original;
          return <div className="flex w-10 ">{cum_count || "NA"}</div>;
        },
      },
      {
        Header: "Points Redeemed",
        accessor: "dr_sum",
        Cell: (props) => {
          const { dr_sum } = props.row.original;
          return <div className="flex w-10 ">{dr_sum || "NA"}</div>;
        },
      },
      {
        Header: "Pincode",
        accessor: "pincode",
        Cell: (props) => {
          const { pincode } = props.row.original;
          return <div className="flex w-10 ">{pincode || "NA"}</div>;
        },
      },
      {
        Header: "Redemption Date",
        accessor: "created_at",
        Cell: (props) => {
          let { created_at } = props.row.original;
          if(created_at!=null){
          // let datetime = created_at.split("T").join(" ").split(".").splice(0, 1)
          return <div className="flex w-20 ">{timestampToLocalTime(created_at) || "NA"}</div>;
          }
          return created_at
        },
      },
      {
        Header: "Redemption Trx",
        accessor: "id",
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-10 ">{id || "NA"}</div>;
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
          columns={constants?.role_id.admin==roleId ? columns : columns_for_host}
          data={data}
          skeletonAvatarColumns={[0]}
          skeletonAvatarProps={{ className: 'rounded-md' }}
          loading={loading}
          pagingData={tableData}
          onPaginationChange={onPaginationChange}
          onSelectChange={onSelectChange}
          onSort={onSort}

        />
        <ExportConfirmation/>
       </> 
  );
}
export default CustomerHistoryTable;
