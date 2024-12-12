import React from "react";
import { Grid2, Paper, Typography } from "@mui/material";

interface Props {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
}

const AnalyticsCards: React.FC<Props> = ({ totalUsers, activeUsers, deletedUsers }) => {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Paper sx={{ padding: "20px", textAlign: "center", bgcolor: "#003975", color: "white" }}>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h3" fontWeight={600}>{totalUsers}</Typography>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Paper sx={{ padding: "20px", textAlign: "center", bgcolor: "#003975", color: "white" }}>
          <Typography variant="h6">Active Users</Typography>
          <Typography variant="h3" fontWeight={600}>{activeUsers}</Typography>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Paper sx={{ padding: "20px", textAlign: "center", bgcolor: "#003975", color: "white" }}>
          <Typography variant="h6">Deleted Users</Typography>
          <Typography variant="h3" fontWeight={600}>{deletedUsers}</Typography>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default AnalyticsCards;
