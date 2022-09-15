import * as React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridApi,
  GridCellValue,
  GridColDef,
  GridRowId,
  GridSortModel,
} from "@mui/x-data-grid";
import { IProject } from "@/store/app/types";
import Button from "@/components/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { allProjectsThunk, getAppSelector, setProjectId } from "@/store/app";

interface IProps {
  userId: any;
}

export default function TableData({ userId }: IProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [queryOptions, setQueryOptions] = React.useState({});
  const { projects, pending, projectId } = useSelector(getAppSelector);

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      setQueryOptions({ sortModel: [...sortModel] });
      if (sortModel.length > 0) {
        const sortData = sortModel[0];
        const dt = {
          userId,
          sortBy: sortData.field,
          sortOrder: sortData.sort,
        };
        dispatch(allProjectsThunk(dt));
      }
    },
    []
  );

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "state",
      headerName: "Status",
      width: 200,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 300,
      editable: false,
    },
    {
      field: "id",
      headerName: "Details",
      sortable: false,
      width: 450,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> | any = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          dispatch(setProjectId(thisRow.id));
          router.push("/details");
        };

        return <Button onClick={onClick}>Fetch Details</Button>;
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={projects}
        columns={columns}
        loading={pending}
        hideFooterPagination
        hideFooterSelectedRowCount
        sortingMode="server"
        checkboxSelection={false}
        onSortModelChange={handleSortModelChange}
      />
    </Box>
  );
}
