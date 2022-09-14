import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IProject } from "@/store/app/types";
import Button from "@/components/core/Button";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
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
    headerName: "Details",
    sortable: false,
    width: 450,
    renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Fetch Details</Button>;
    },
  },
];

interface IProps {
  projects: IProject[];
  isLoading: boolean;
}

export default function TableData({ projects, isLoading }: IProps) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={projects}
        columns={columns}
        loading={isLoading}
        hideFooterPagination
      />
    </Box>
  );
}
