import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortedColumn, setTableData, getTransaction,toggleDialogConfirmation, setSelectedTransactionId } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import { Tooltip } from "@/components/ui";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import TransactionDialog from "./transactionDialog";

const statusColor = {
  "Pending": {
    label: "PENDING",
    dotClass: "bg-orange-500",
    textClass: "text-orange-500",
  },
  "Completed": {
    label: "COMPLETED",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
};
const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onView = () => {
    dispatch(toggleDialogConfirmation(true));
    dispatch(setSelectedTransactionId(row.id))
  };

  return (
    <div className="flex justify-start text-lg">
      <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onView}
      >
        <Tooltip title="View">
          <BsEyeFill color="skyblue" />
        </Tooltip>
      </span>
    </div>
  );
};

function UsersTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total,filterType } = useSelector(
    (state) => state.transactionList.data.tableData
  );
  const loading = useSelector((state) => state.transactionList.data.loading);
  const data = useSelector((state) => state.transactionList.data.transactionList);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total,filterType }),
    [pageIndex, pageSize, sort, query, total,filterType]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query,filterType]);

  const fetchData = () => {
    if (loading) return; 
    dispatch(getTransaction({ pageIndex, pageSize, sort, query, filterType }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Transaction Id",
        accessor: "transaction_id",
        sortable: true,
        Cell: (props) => {
          const { transaction_id } = props.row.original;
          return <div className="flex w-48 ">{transaction_id}</div>;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        sortable: true,
        Cell: (props) => {
          const { name } = props.row.original;
          return <div className="flex w-32 ">{name}</div>;
        }
      }, {
        Header: "Mobile",
        accessor: "mobile",
        sortable: true,
        Cell: (props) => {
          const { mobile } = props.row.original;
          return <div className="flex w-20 ">{mobile}</div>;
        },
      },
      {
        Header: "Plan Id",
        accessor: "plan_id",
        sortable: true,
        Cell: (props) => {
          const { plan_id } = props.row.original;
          return <div className="flex w-32 ">{plan_id}</div>;
        },
      },
      {
        Header: "Plan type",
        accessor: "plan_type",
        sortable: true,
        Cell: (props) => {
          const { plan_type } = props.row.original;
          return <div className="flex w-20 ">{plan_type}</div>;
        },
      },
      {
        Header: "Transaction Amount",
        accessor: "transaction_amount",
        sortable: true,
        Cell: (props) => {
          const { transaction_amount } = props.row.original;
          return <div className="flex w-20 ">{transaction_amount}</div>;
        },
      },
      {
        Header: "Transaction Date & Time",
        accessor: "transaction_utc_datetime",
        sortable: true,
        Cell: (props) => {
          let { transaction_utc_datetime } = props.row.original;
          if(transaction_utc_datetime!=null){
          let datetime = transaction_utc_datetime.split("T").join(" ").split(".").splice(0, 1)
          return <div className="flex w-24 ">{datetime}</div>;
          }
          return transaction_utc_datetime
        },
      },
      {
        Header: "Transaction Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;
          return (
            <div className="flex items-center  h-16 gap-2">
              <span
                className={`capitalize font-semibold ${
                  statusColor[status].textClass
                }`}
              >
                {statusColor[status].label}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "",
        id: "action",
        Cell: (props) => <ActionColumn row={props.row.original} />,
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

      {/* {(!loading && !isEmpty(data)) ? ( */}
      <>
        <DataTable
          columns={columns}
          data={data}
          skeletonAvatarColumns={[0]}
          skeletonAvatarProps={{ className: 'rounded-md' }}
          loading={loading}
          pagingData={tableData}
          onPaginationChange={onPaginationChange}
          onSelectChange={onSelectChange}
          onSort={onSort}

        />
        <TransactionDialog />
      </>

    {/* ) : <div></div>}
    {(!loading && isEmpty(data)) && (
      <div className=" flex flex-col items-center justify-start">
        <DoubleSidedImage
          src="/img/others/img-2.png"
          darkModeSrc="/img/others/img-2-dark.png"
          alt="No Transaction found!"
        />
        <h3 className="mt-8">No Transaction found!</h3>
      </div>
    )} */}
    </>
   
  );
}
export default UsersTable;
