import { useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import {
  getClusterFacility,
  setSortedColumn,
  setTableData,
} from "../store/dataSlice";
import {
  addRowItem,
  removeRowItem,
  setSelectedRows,
} from "../store/stateSlice";
import RowSelection from "@/components/shared/RowSelection";

function ClusterTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.clusterForm.data.tableData
  );
  const loading = useSelector((state) => state.clusterForm.data.loading);
  const data = useSelector((state) => state.clusterForm.data.clusterList);
  const selectedIds = useSelector(
    (state) => state.clusterForm.data.selectedIds
  );
  const finalSelected = useSelector(
    (state) => state.clusterForm.data.finalSelected
  );
  

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );
  const selectedRows = useSelector(
    (state) => state.clusterForm.state.selectedRows
  );
  const clients = useSelector((state) => state.clusterForm.data.clients);
  const locations = useSelector((state) => state.clusterForm.data.locations);
  const blocks = useSelector((state) => state.clusterForm.data.blocks);

  const cluster_Type = useSelector(
    (state) => state.clusterForm.data.clusterType
  );
  const block_id = useSelector((state) => state.clusterForm.data.selectedBlock);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageIndex,
    pageSize,
    sort,
    tableData,
    block_id,
    cluster_Type,
    clients,
    locations,
    blocks,
  ]);

  const fetchData = () => {
    if (loading) return;
    if (block_id) {
      dispatch(
        getClusterFacility({ pageIndex, pageSize, sort, query, block_id })
      );
    } else {
      dispatch(getClusterFacility({ pageIndex, pageSize, sort, query }));
    }
  };
  useEffect(() => {
    dispatch(setSelectedRows([]));
  }, [block_id, cluster_Type]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-16 ">{id}</div>;
        },
      },
      {
        Header: "Facility Name",
        accessor: "facility_name",
        sortable: true,
        Cell: (props) => {
          const { facility_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {facility_name}
            </div>
          );
        },
      },
      {
        Header: "Floor",
        accessor: "floor_number",
        sortable: true,
        Cell: (props) => {
          const { floor_number } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {floor_number}
            </div>
          );
        },
      },

      {
        Header: "Block",
        accessor: "block_name",
        sortable: true,
        Cell: (props) => {
          const { block_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {block_name}
            </div>
          );
        },
      },
      {
        Header: "Location",
        accessor: "location_name",
        sortable: true,
        Cell: (props) => {
          const { location_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {location_name}
            </div>
          );
        },
      },
      {
        Header: "Client",
        accessor: "client_name",
        sortable: true,
        Cell: (props) => {
          const { client_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {client_name}
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
  const onRowSelect = (checked, row) => {
    if (checked) {
        dispatch(addRowItem([{ ...row, isSelected: 1 }]))
    } else {
        dispatch(removeRowItem([{ ...row, isSelected: 0 }]))
    }
}

const onAllRowSelect = useCallback((checked, rows) => {
  if (checked) {
      const originalRows = rows.map(row => {
          return { ...row.original, isSelected: 1 }
      })
      dispatch(setSelectedRows(originalRows))
  } else {
      const originalRows = rows.map(row => {
          return { ...row.original, isSelected: 0 }
      })
      dispatch(setSelectedRows(originalRows))
  }
}, [dispatch])


  return (
    <>
      {
       <RowSelection
       columns={columns}
       data={data}
       loading={loading}
       pagingData={tableData}
       onPaginationChange={onPaginationChange}
       onSelectChange={onSelectChange}
       onSort={onSort}
       onCheckBoxChange={onRowSelect}
       onIndeterminateCheckBoxChange={onAllRowSelect}
       defaultSelected={selectedRows}
       selectable
        />
      }
     
    </>
  );
}
export default ClusterTable;
