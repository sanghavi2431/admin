import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import cloneDeep from "lodash/cloneDeep";
import { Badge, Tag, Card } from "@/components/ui";
import { DataTable } from "@/components/shared";
import { getRoles, setTableData } from "../store/dataSlice";
import { setSortedColumn, setSelectedRole } from "../store/stateSlice";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { Tooltip } from "@/components/ui";
import RBACDeleteConfirmation from "./rbacDeleteConfirmation";

const statusColor = {
  null: {
    label: "Active",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  1: {
    label: "Active",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  0: { label: "Inactive", dotClass: "bg-red-500", textClass: "text-red-500" },
};

const Access = ({ status }) => {
  return (
    <Tag className="text-violet-600 bg-violet-100 dark:text-violet-100 dark:bg-violet-500/20  border-0 rounded ">
      {status}
    </Tag>
  );
};

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch();
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess);
  const roleId = useSelector((state) => state.auth.user.roleId);
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/rbac-roleEdit/${row.id}`);
  };
  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedRole(row.id));
  };
  return (
    <div className="flex  text-lg">
      {rolesAccess["/rbac-roleEdit"] && (
        <span
          className={`cursor-pointer p-2 hover:${textTheme} `}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit className="text-[#00C3DE]" />
          </Tooltip>
        </span>
      )}
      {rolesAccess["/rbac-roleDelete"] && (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onDelete}
        >
          <Tooltip title="Delete">
            <HiOutlineTrash className="text-[#00C3DE]" />
          </Tooltip>
        </span>
      )}
    </div>
  );
};

const RoleTable = () => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.roleList.data.tableData
  );
  const filterData = useSelector((state) => state.roleList.data.filterData);
  const loading = useSelector((state) => state.roleList.data.loading);
  const data = useSelector((state) => state.roleList.data.roleList);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const fetchData = () => {
    if (loading) return;
    dispatch(getRoles({ pageIndex, pageSize, sort, query, filterData }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "#ID",
        accessor: "id",
        sortable: true,
      },
      {
        Header: "Role Name",
        accessor: "name",
        sortable: true,
      },
      {
        Header: "Display Name",
        accessor: "display_name",
        sortable: true,
      },

      {
        Header: "",
        id: "action",
        accessor: (row) => row,
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
      <RBACDeleteConfirmation />
    </>
  );
};

export default RoleTable;
