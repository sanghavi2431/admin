import { useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, setTableData, setSortedColumn } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { DataTable } from "@/components/shared";

const statusColor = {
  1: {
    label: "INITIATED",
    dotClass: "bg-yellow-500",
    textClass: "text-yellow-500",
  },
  2: {
    label: "PAID",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  3: {
    label: "FAILED",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};
function OrderTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.orderList.data.tableData
  );
  const loading = useSelector((state) => state.orderList.data.loading);
  const data = useSelector((state) => state.orderList.data.orderList);
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
    dispatch(getOrders({ pageIndex, pageSize, sort, query }));
  };


  const columns = useMemo(
    () => [
      {
        Header: "Client Name",
        accessor: "client_name",
        sortable: false,
        Cell: (props) => {
          const { client_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{client_name}</div>
          );
        },
      },
      {
        Header: "Order Id",
        accessor: "order_id",
        sortable: false,
        Cell: (props) => {
          const { order_id } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{order_id}</div>
          );
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        sortable: false,
        Cell: (props) => {
          const { amount } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{amount}</div>
          );
        },
      },
      {
        Header: "Plan - Addons",
        accessor: "items",
        sortable: false,
        Cell: (props) => {
          const { items } = props.row.original;
          let names = []
          names = items.map((item) => item?.item_name)
          return (
            <div className="flex w-30  justify-start align-end">
              {
                names.map((name, index) => {
                  return index ? <span>{" , " + name}</span> : <span>{name}</span>
                })
              }
            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        sortable: false,
        Cell: (props) => {
          const { status } = props.row.original;

          return (
            <div className="flex h-10 items-center gap-2">
              <span
                className={`capitalize font-semibold ${statusColor?.[status]?.textClass
                  }`}
              >
                {statusColor?.[status]?.label}
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
export default OrderTable;
