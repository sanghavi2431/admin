import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortedColumn,
  setTableData,
  toggleDeleteConfirmation,
  setSelectedVoucherId,
  setSelectedUserId,
} from "../store/dataSlice";
import { getVoucherUses } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import { useLocation } from "react-router-dom";
import { DoubleSidedImage } from "@/components/shared";
import { isEmpty } from "lodash";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { Tooltip } from "@/components/ui";
import { Button } from "@/components/ui";

import UsersDeleteConfirmation from "./usersDeleteConfirmation";

function VoucherUsesTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.voucherusesList.data.tableData
  );
  const loading = useSelector((state) => state.voucherusesList.data.loading);
  const data = useSelector(
    (state) => state.voucherusesList.data.voucherUsesList
  );
  const location = useLocation();
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass();
    const onDelete = () => {
      dispatch(toggleDeleteConfirmation(true));
      dispatch(setSelectedVoucherId(id));
      dispatch(setSelectedUserId(row.id));
    };

    return (
      <div className="flex justify-start text-lg">
        {row.isDeactivate == "1" ? (
          <span
            className={`cursor-not-allowed icon-disabled p-2 hover:${textTheme}`}
          >
            <Tooltip title="Deactivate">
              <Button
                className={`cursor-pointer p-2`}
                onClick={onDelete}
                size="xs"
                variant="solid"
                disabled={true}
              >
                Deactivate
              </Button>
            </Tooltip>
          </span>
        ) : (
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onDelete}
          >
            <Tooltip title="Deactivate">
              <Button
                className={`cursor-pointer p-2`}
                onClick={onDelete}
                size="xs"
                variant="solid"
                disabled={false}
              >
                Deactivate
              </Button>
            </Tooltip>
          </span>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getVoucherUses({ pageIndex, pageSize, sort, query, id }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",

        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-6 ">{id}</div>;
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
        Header: "Expiry",
        accessor: "expiry",
        Cell: (props) => {
          let { expiry_date } = props.row.original;

          return (
            <div className="flex   justify-start align-end">{expiry_date}</div>
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
export default VoucherUsesTable;
