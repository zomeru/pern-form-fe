import React from "react";
import { useQuery, gql } from "@apollo/client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { startCase, uniq } from "lodash";

import { SubmissionsQuery } from "../graphql";

const Dashboard: React.FC = () => {
  const { data, error, loading } = useQuery<SubmissionsQuery>(gql`
    query Submissions {
      submissions {
        id
        submittedAt
        data
      }
    }
  `);

  console.log({
    data,
    error,
    loading,
  });

  const { submissions } = data || { submissions: [] };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "submittedAt", headerName: "Submitted", width: 200 },
    ...uniq(submissions.flatMap((s) => Object.keys(s.data))).map((field) => ({
      field,
      headerName: startCase(field),
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.data[field],
    })),
  ];

  return (
    <Box sx={{ height: "95vh", width: "100%" }}>
      {data && submissions && (
        <DataGrid
          rows={submissions}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      )}
    </Box>
  );
};

export default Dashboard;
