import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortedColumn,
  setTableData,
  getOwnerHistory,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import { DoubleSidedImage } from "@/components/shared";
import { isEmpty } from "lodash";
import { TextEllipsis } from "@/components/shared";
import ExportConfirmation from "./exportConfirmation";
import { Tooltip } from "@/components/ui";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { constants } from "@/constants/woloo.constant";
import { BsEyeFill } from "react-icons/bs";

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
const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
    const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId);

  return (
    <div className="flex justify-end text-lg">
      {constants.role_id.host==roleId ? (
        
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={()=>navigate("/loyaltyReport")}
        >
          <Tooltip title="View Detail">
            <BsEyeFill color="skyblue" />
          </Tooltip>
        </span>
      ) : null}

    </div>
  );
};

function OwnerHistoryTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total, filterType } = useSelector(
    (state) => state.ownerHistoryList.data.tableData
  );
  const loading = useSelector((state) => state.ownerHistoryList.data.loading);
  const data = useSelector(
    (state) => state.ownerHistoryList.data.ownerHistoryList
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
    dispatch(getOwnerHistory({ pageIndex, pageSize, sort, query, filterType }));
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
        Header: "Owner Type",
        accessor: "owner_type",
        sortable: true,
        Cell: (props) => {
          const { owner_type } = props.row.original;
          return <div className="flex w-10 ">{owner_type || "NA"}</div>;
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
        Header: "Active Subscription",
        accessor: "active_count",
        sortable: true,
        Cell: (props) => {
          const { active_count } = props.row.original;
          return <div className="flex w-28 ">{active_count || "NA"}</div>;
        },
      },
      {
        Header: "Inactive Subscription",
        accessor: "inactive_count",
        sortable: true,
        Cell: (props) => {
          const { inactive_count } = props.row.original;
          return <div className="flex w-28 ">{inactive_count || "NA"}</div>;
        },
      },
      {
        Header: "Other Points",
        accessor: "other_points",
        sortable: true,
        Cell: (props) => {
          const { other_points } = props.row.original;
          return <div className="">{other_points || "NA"}</div>
        },
      },
      {
        Header: "Gift Points",
        accessor: "gift_points",
        sortable: true,
        Cell: (props) => {
          const { gift_points } = props.row.original;
          return <div className="">{gift_points || "NA"}</div>
        },
      },
      {
        Header: "",
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
export default OwnerHistoryTable;
