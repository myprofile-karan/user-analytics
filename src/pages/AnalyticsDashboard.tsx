import React, { useMemo, useState } from "react";
import { Container, Grid2, Paper, Typography, MenuItem, TextField } from "@mui/material";
import AnalyticsCards from "../components/AnalyticsCards";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import dayjs from "dayjs";
import { useAppSelector } from "../store/hooks";
import { MonthData, User } from "../types";
import DateFieldPicker from "../components/DatePicker";

const AnalyticsDashboard: React.FC = () => {
  const { users } = useAppSelector((state) => state.users);

  // State for filters
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // Filtered users based on date range and region
  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      const userDate = dayjs(user.createdAt);

      const isWithinDateRange =
        (!startDate || userDate.isAfter(startDate, "day")) &&
        (!endDate || userDate.isBefore(endDate, "day"));

      const isRegionMatch = selectedRegion
        ? user.region.toLowerCase() === selectedRegion.toLowerCase()
        : true;

      return isWithinDateRange && isRegionMatch;
    });
  }, [users, startDate, endDate, selectedRegion]);

  // Calculate statistics
  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter((user: User) => user.status).length;
  const inactiveUsers = totalUsers - activeUsers;

  // Registration data for Line Chart
  const registrationData = useMemo(() => {
    const months: MonthData[] = [];
    const now = dayjs();
    for (let i = 5; i >= 0; i--) {
      const date = now.subtract(i, "month");
      months.push({
        month: date.format("MMM"),
        year: date.year(),
        count: 0,
      });
    }

    filteredUsers.forEach((user: User) => {
      const userDate = dayjs(user.createdAt);
      const month = userDate.format("MMM");
      const year = userDate.year();

      const monthEntry = months.find((entry) => entry.month === month && entry.year === year);
      if (monthEntry) {
        monthEntry.count += 1;
      }
    });

    return months.map(({ month, count }) => ({ month, count }));
  }, [filteredUsers]);

  // Region list for dropdown
  const regionList = useMemo(() => {
    const regions = new Set<string>();
    users.forEach((user: User) => regions.add(user.region));
    return Array.from(regions);
  }, [users]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "70px" }}>
      <Typography variant="h6" fontWeight={900} gutterBottom align="center">
        Analytics Dashboard
      </Typography>

      {/* Filters */}
      <Grid2 container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <DateFieldPicker
            field={{ value: startDate }}
            form={{ setFieldValue: (_name: string, value: dayjs.Dayjs | null) => setStartDate(value) }}
            label="Start Date"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <DateFieldPicker
            field={{ value: endDate }}
            form={{ setFieldValue: (_name: string, value: dayjs.Dayjs | null) => setEndDate(value) }}
            label="End Date"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            label="Region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            select
            fullWidth
            size="small"
            sx={{
              bgcolor: "white",
              "& .MuiInputLabel-root": { color: "blue", },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {regionList.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </TextField>
        </Grid2>
      </Grid2>

      {/* Analytics Content */}
      <Grid2 container spacing={3}>
        {/* Analytics Cards */}
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ padding: "20px", background: "#F8F9FA" }}>
            <AnalyticsCards totalUsers={totalUsers} activeUsers={activeUsers} deletedUsers={inactiveUsers} />
          </Paper>
        </Grid2>

        {/* User Registration Trend */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ overflow: "hidden", background: "#F8F9FA" }}>
            <Typography fontWeight={900} sx={{ bgcolor: "#003975", color: "white", p: 1, mb: 3 }}>
              User Registration Trend
            </Typography>
            <LineChart data={registrationData} />
          </Paper>
        </Grid2>

        {/* Active vs Inactive Users */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ overflow: "hidden", background: "#F8F9FA" }}>
            <Typography fontWeight={900} sx={{ bgcolor: "#003975", color: "white", p: 1, mb: 3 }}>
              Active vs Inactive Users
            </Typography>
            <PieChart active={activeUsers} inactive={inactiveUsers} />
          </Paper>
        </Grid2>

        {/* Users by Region */}
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ overflow: "hidden", background: "#F8F9FA" }}>
            <Typography fontWeight={900} sx={{ bgcolor: "#003975", color: "white", p: 1, mb: 3 }}>
              Users by Region
            </Typography>
            <BarChart users={filteredUsers} />
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default AnalyticsDashboard;
