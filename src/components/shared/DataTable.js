import React, { forwardRef, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Pagination, Select, Checkbox } from "@/components/ui";
import TableRowSkeleton from "./loaders/TableRowSkeleton";
import Loading from "./Loading";
import { useTable, usePagination, useSortBy, useRowSelect } from "react-table";

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const IndeterminateCheckbox = forwardRef((props, ref) => {
  const {
    indeterminate,
    onChange,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    ...rest
  } = props;

  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  const handleChange = (e) => {
    onChange(e);
    onCheckBoxChange?.(e);
    onIndeterminateCheckBoxChange?.(e);
  };

  return (
    <Checkbox
      className="mb-0"
      ref={resolvedRef}
      onChange={(_, e) => handleChange(e)}
      {...rest}
    />
  );
});

const DataTable = (props) => {
  const {
    skeletonAvatarColumns,
    columns,
    data,
    loading,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    onPaginationChange,
    onSelectChange,
    onSort,
    pageSizes,
    selectable,
    skeletonAvatarProps,
    pagingData,
    autoResetSelectedRows,
  } = props;

  const { pageSize, pageIndex, total } = pagingData;

  const pageSizeOption = useMemo(
    () =>
      pageSizes.map((number) => ({ value: number, label: `${number} / page` })),
    [pageSizes]
  );

  const handleCheckBoxChange = (checked, row) => {
    if (!loading) {
      onCheckBoxChange?.(checked, row);
    }
  };

  const handleIndeterminateCheckBoxChange = (checked, rows) => {
    if (!loading) {
      onIndeterminateCheckBoxChange?.(checked, rows);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        manualPagination: true,
        manualSortBy: true,
        autoResetSelectedRows,
        autoResetSelectedCell: false,
        autoResetSelectedColumn: false,
      },
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
        if (selectable) {
          hooks.visibleColumns.push((columns) => [
            {
              id: "selection",
              Header: (props) => (
                <div>
                  <IndeterminateCheckbox
                    {...props.getToggleAllRowsSelectedProps()}
                    onIndeterminateCheckBoxChange={(e) =>
                      handleIndeterminateCheckBoxChange(
                        e.target.checked,
                        props.rows
                      )
                    }
                  />
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox
                    {...row.getToggleRowSelectedProps()}
                    onCheckBoxChange={(e) =>
                      handleCheckBoxChange(e.target.checked, row.original)
                    }
                  />
                </div>
              ),
              sortable: false,
            },
            ...columns,
          ]);
        }
      }
    );

  const handlePaginationChange = (page) => {
    if (!loading) {
      onPaginationChange?.(page);
    }
  };

  const handleSelectChange = (value) => {
    if (!loading) {
      onSelectChange?.(Number(value));
    }
  };

  const handleSort = (column) => {
    if (!loading) {
      const { id, isSortedDesc, toggleSortBy, clearSortBy } = column;
      const sortOrder = isSortedDesc ? "desc" : "asc";
      toggleSortBy(!isSortedDesc);
      onSort?.({ order: sortOrder, key: id }, { id, clearSortBy });
    }
  };

  return (
    <Loading loading={loading && data.length !== 0} type="cover">
      <div className="border p-6 shadow-custom rounded-3xl">
        <Table {...getTableProps()} className="border-separate">
          <THead className="">
            {headerGroups.map((headerGroup) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-[#F7F8FA] rounded-full shadow-custom"
              >
                {/* <div className=" w-full border-2 border-black p-6 rounded-full"> */}
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`${index === 0 ? "rounded-l-lg border-l" : ""} ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-r-lg border-r"
                        : ""
                    } border-t border-b`}
                    style={{ padding: "20px 40px" }}
                  >
                    {column.render("Header") &&
                      (column.sortable ? (
                        <div
                          className="cursor-pointer"
                          onClick={() => handleSort(column)}
                        >
                          {column.render("Header")}
                          <span>
                            <Sorter sort={column.isSortedDesc} />
                          </span>
                        </div>
                      ) : (
                        <div>{column.render("Header")}</div>
                      ))}
                  </Th>
                ))}
                {/* </div> */}
              </Tr>
            ))}
          </THead>
          {loading && data.length === 0 ? (
            <TableRowSkeleton
              columns={columns.length}
              rows={pagingData.pageSize}
              avatarInColumns={skeletonAvatarColumns}
              avatarProps={skeletonAvatarProps}
            />
          ) : (
            <TBody {...getTableBodyProps()} className="border-0">
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} className="border-0">
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </TBody>
          )}
        </Table>
        <div className="md:flex items-center justify-between mt-4">
          <Pagination
            pageSize={pageSize}
            currentPage={pageIndex}
            total={total}
            onChange={handlePaginationChange}
          />
          <div style={{ minWidth: 130 }}>
            <Select
              size="sm"
              menuPlacement="top"
              isSearchable={false}
              value={pageSizeOption.filter(
                (option) => option.value === pageSize
              )}
              options={pageSizeOption}
              onChange={(option) => handleSelectChange(option.value)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onCheckBoxChange: PropTypes.func,
  onIndeterminateCheckBoxChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  onSort: PropTypes.func,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  selectable: PropTypes.bool,
  skeletonAvatarColumns: PropTypes.arrayOf(PropTypes.number),
  skeletonAvatarProps: PropTypes.object,
  pagingData: PropTypes.shape({
    total: PropTypes.number,
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
  }),
};

DataTable.defaultProps = {
  pageSizes: [10, 25, 50, 100],
  pagingData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  },
  data: [],
  columns: [],
  selectable: false,
  loading: false,
};

export default DataTable;
