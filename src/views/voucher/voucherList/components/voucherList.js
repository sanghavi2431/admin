import { useMemo, useCallback } from "react";
import { HiOutlineTrash, HiUserGroup } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import { MdOutlineUploadFile } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteConfirmation,
  setSortedColumn,
  setTableData,
  getVoucher,
  setSelectedVoucher,
  toggleCreateConfirmation,
  getVoucherDownloadLink,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { TextEllipsis } from "@/components/shared";
import VoucherDeleteConfirmation from "./voucherDeleteConfirmation";
import {
  addRowItem,
  removeRowItem,
  setSelectedRows,
} from "../store/stateSlice";
import RowSelection from "@/components/shared/RowSelection";
import VoucherBulkDeleteConfirmation from "./voucherBulkDeleteConfirmation";
import CreateConfirmation from "./voucherCreatePO";
import { Tooltip } from "@/components/ui";
import ExportConfirmation from "./bulkUploadConfirmation";

const paymentstatusColor = {
  pending: {
    label: "PENDING",
    dotClass: "bg-yellow-500",
    textClass: "text-yellow-500",
  },
  paid: {
    label: "PAID",
    dotClass: "bg-blue-500",
    textClass: "text-red-500",
  },
  free: {
    label: "FREE",
    dotClass: "bg-green-500",
    textClass: "text-green-500",
  },
};
const statusColor = {
  1: {
    label: "ACTIVE",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  0: {
    label: "INACTIVE",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};
const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess);

  const onEdit = () => {
    navigate(`/voucher-Edit/${row.id}`);
  };

  const onView = () => {
    navigate(`/voucher-View/${row.id}`);
  };
  const onViewUses = () => {
    navigate(`/voucher-Uses/${row.id}`);
    dispatch(setSelectedVoucher(row.id));
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedVoucher(row.id));
  };
  const onCreate = () => {
    dispatch(toggleCreateConfirmation(true));
    dispatch(setSelectedVoucher(row.id));
  };
  const onDownload = async () => {
    let data = {};
    data.voucherId = row.id;
    const voucherDownloadLink = await getVoucherDownloadLink(data);
    let link = document.createElement("a");
    link.href = voucherDownloadLink["link"];
    link.setAttribute("download", "Voucher_Links.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="flex justify-start text-lg">
      {rolesAccess["/voucher-Uses"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onViewUses}
        >
          <Tooltip title="View User">
            <HiUserGroup color="green" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/voucher-View"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <Tooltip title="View">
            <BsEyeFill color="orange" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/voucher-Upload"] ? (
        row.payment_mode.value === "0" && row.type_of_voucher.value === "1" ? (
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onCreate}
          >
            <Tooltip title="Upload PO">
              <MdOutlineUploadFile color="blue" />
            </Tooltip>
          </span>
        ) : (
          <span
            className={`cursor-not-allowed icon-disabled p-2 hover:${textTheme}`}
          >
            <Tooltip title="Upload PO">
              <MdOutlineUploadFile color="grey" />
            </Tooltip>
          </span>
        )
      ) : null}
      {rolesAccess["/voucher-Download"] ? (
        row.downloadLink !== null ? (
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onDownload}
          >
            <Tooltip title="Download">
              <HiOutlineDownload color="blue" />
            </Tooltip>
          </span>
        ) : (
          <span
            className={`cursor-not-allowed icon-disabled p-2 hover:${textTheme}`}
          >
            <Tooltip title="Download">
              <HiOutlineDownload color="grey" />
            </Tooltip>
          </span>
        )
      ) : null}
      {rolesAccess["/voucher-Edit"] ? (
        row.payment_mode.value === "0" && row.payment_status !== "paid" ? (
          <span
            className={`cursor-pointer p-2 hover:${textTheme} `}
            onClick={onEdit}
          >
            <Tooltip title="Edit">
              <MdModeEdit color="skyblue" />
            </Tooltip>
          </span>
        ) : (
          <span
            className={`cursor-not-allowed icon-disabled p-2 hover:${textTheme}`}
            onClick={onEdit}
          >
            <Tooltip title="Edit">
              <MdModeEdit color="grey" />
            </Tooltip>
          </span>
        )
      ) : null}
      {rolesAccess["/voucher-Delete"] ? (
        row.status.value === "0" ? (
          <span
            className={`cursor-not-allowed icon-disabled p-2 hover:${textTheme}`}
          >
            <Tooltip title="Delete">
              <HiOutlineTrash color="grey" />
            </Tooltip>
          </span>
        ) : (
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onDelete}
          >
            <Tooltip title="Delete">
              <HiOutlineTrash color="red" />
            </Tooltip>
          </span>
        )
      ) : null}
    </div>
  );
};

function UsersTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total, filterType } = useSelector(
    (state) => state.voucherList.data.tableData
  );
  const loading = useSelector((state) => state.voucherList.data.loading);
  const data = useSelector((state) => state.voucherList.data.voucherList);
  const selectedRows = useSelector(
    (state) => state.voucherList.state.selectedRows
  );

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total, filterType }),
    [pageIndex, pageSize, sort, query, total, filterType]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query, filterType]);

  const fetchData = () => {
    if (loading) return; 
    dispatch(getVoucher({ pageIndex, pageSize, sort, query, filterType }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-6 ">{id}</div>;
        },
      },
      {
        Header: "Corporates",
        accessor: "corporate_id",
        sortable: true,
        Cell: (props) => {
          const { corporate_id } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">
              {corporate_id}
            </div>
          );
        },
      },
      {
        Header: "Expiry",
        accessor: "expiry",
        sortable: true,
        Cell: (props) => {
          const { expiry } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">
              <TextEllipsis text={expiry} maxTextCount={13} />
            </div>
          );
        },
      },
      {
        Header: "Number of Uses",
        accessor: "number_of_uses",
        sortable: true,
        Cell: (props) => {
          const { number_of_uses } = props.row.original;
          return (
            <div className="flex w-16 justify-start">{number_of_uses}</div>
          );
        },
      },
      {
        Header: "Organization",
        accessor: "type_of_organization",
        sortable: true,
        Cell: (props) => {
          const { type_of_organization } = props.row.original;
          return (
            <div className="flex w-16  justify-start">
              {type_of_organization.label}
            </div>
          );
        },
      },
      {
        Header: "Type of Voucher",
        accessor: "type_of_voucher",
        sortable: true,
        Cell: (props) => {
          const { type_of_voucher } = props.row.original;
          return (
            <div className="flex w-16  justify-start">
              {type_of_voucher.label}
            </div>
          );
        },
      },
      {
        Header: "Days",
        accessor: "days",
        sortable: true,
        Cell: (props) => {
          const { days } = props.row.original;
          return <div className="flex w-16  justify-start">{days}</div>;
        },
      },
      {
        Header: "Already Use count",
        accessor: "already_use_count",
        sortable: true,
        Cell: (props) => {
          const { already_use_count } = props.row.original;
          return (
            <div className="flex w-16  justify-start">{already_use_count}</div>
          );
        },
      },
      {
        Header: "Payment Mode",
        accessor: "payment_mode.label",
        sortable: true,
        Cell: (props) => {
          const { payment_mode } = props.row.original;
          return (
            <div className="flex w-16  justify-start">{payment_mode.label}</div>
          );
        },
      },
      {
        Header: "Payment Status",
        accessor: "payment_status",
        sortable: true,
        Cell: (props) => {
          const { payment_status } = props.row.original;

          return (
            <div className="flex items-center gap-2">
              <span
                className={`capitalize font-semibold ${paymentstatusColor[payment_status].textClass}`}
              >
                {paymentstatusColor[payment_status].label}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;

          return (
            <div className="flex items-center gap-2">
              <span
                className={`capitalize font-semibold ${
                  statusColor[status.value].textClass
                }`}
              >
                {statusColor[status.value].label}
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
  const onRowSelect = (checked, row) => {
    if (checked) {
      dispatch(addRowItem([{ ...row, isSelected: 1 }]));
    } else {
      dispatch(removeRowItem([{ ...row, isSelected: 0 }]));
    }
  };

  const onAllRowSelect = useCallback(
    (checked, rows) => {
      if (checked) {
        const originalRows = rows.map((row) => {
          return { ...row.original, isSelected: 1 };
        });
        dispatch(setSelectedRows(originalRows));
      } else {
        const originalRows = rows.map((row) => {
          return { ...row.original, isSelected: 0 };
        });
        dispatch(setSelectedRows(originalRows));
      }
    },
    [dispatch]
  );
  return (
    <>
      <RowSelection
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
        selectable
        onCheckBoxChange={onRowSelect}
        defaultSelected={selectedRows}
        onIndeterminateCheckBoxChange={onAllRowSelect}
      />
      <ExportConfirmation />
      <VoucherDeleteConfirmation />
      <VoucherBulkDeleteConfirmation />
      <CreateConfirmation />
    </>
  );
}
export default UsersTable;
