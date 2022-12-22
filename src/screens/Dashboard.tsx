import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
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

  const [generateSubmission] = useMutation(gql`
    mutation GenerateSubmissions($count: Int!) {
      queueSubmissionGeneration(count: $count)
    }
  `);
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
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box sx={{ height: "100%", width: "100%" }}>
        <Button
          variant="contained"
          onClick={() => {
            generateSubmission({ variables: { count: 10 } });
          }}
        >
          Generate Submissions
        </Button>
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
    </div>
  );
};

export default Dashboard;
