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
import { useDispatch } from "react-redux";
import { allProjectsThunk, setProjectId } from "@/store/app";

interface IProps {
  projects: IProject[];
  isLoading: boolean;
  userId: any;
}

export default function TableData({ projects, isLoading, userId }: IProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [queryOptions, setQueryOptions] = React.useState({});

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
      headerName: "Date",
      width: 450,
      editable: false,
    },
  ];
  const goToDetails = () => {
    router.push("/details");
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {selectionModel.length > 0 && (
        <Button onClick={goToDetails}>Fetch Details</Button>
      )}
      <DataGrid
        rows={projects}
        columns={columns}
        loading={isLoading}
        hideFooterPagination
        checkboxSelection
        selectionModel={selectionModel}
        hideFooterSelectedRowCount
        sortingMode="server"
        onSelectionModelChange={(selection) => {
          if (selection.length > 1) {
            const selectionSet = new Set(selectionModel);
            const result = selection.filter((s) => !selectionSet.has(s));
            setSelectionModel(result);
            dispatch(setProjectId(result[0].toString()));
          } else {
            setSelectionModel(selection);
          }
        }}
        onSortModelChange={handleSortModelChange}
      />
    </Box>
  );
}
