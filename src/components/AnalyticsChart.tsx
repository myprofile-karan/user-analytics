import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

// Mock Data for Analytics
const registrationData = [
  { month: "Jan", users: 50 },
  { month: "Feb", users: 70 },
  { month: "Mar", users: 100 },
  { month: "Apr", users: 130 },
  { month: "May", users: 150 },
  { month: "Jun", users: 200 },
];

const activeInactiveData = [
  { name: "Active", value: 400 },
  { name: "Inactive", value: 100 },
];

const usersByRegionData = [
  { region: "North", users: 120 },
  { region: "South", users: 300 },
  { region: "East", users: 150 },
  { region: "West", users: 180 },
];

const COLORS = ["#0088FE", "#FFBB28"];

const AnalyticsChart = () => {
  const [regionFilter, setRegionFilter] = useState("All");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegionFilter(event.target.value);
  };

  const handleDateChange = (field: string, value: string) => {
    setDateRange({ ...dateRange, [field]: value });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Analytics Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">500</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">400</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Deleted Users</Typography>
              <Typography variant="h4">50</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box mb={3} display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.startDate}
          onChange={(e) => handleDateChange("startDate", e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.endDate}
          onChange={(e) => handleDateChange("endDate", e.target.value)}
        />
        <TextField
          select
          label="Region"
          value={regionFilter}
          onChange={handleRegionChange}
          variant="outlined"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="North">North</MenuItem>
          <MenuItem value="South">South</MenuItem>
          <MenuItem value="East">East</MenuItem>
          <MenuItem value="West">West</MenuItem>
        </TextField>
      </Box>

      {/* User Registration Trend (Line Chart) */}
      <Box mb={5}>
        <Typography variant="h6" mb={2}>
          User Registration Trend (Last 6 Months)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={registrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Active vs Inactive Users (Pie Chart) */}
      <Box mb={5}>
        <Typography variant="h6" mb={2}>
          Active vs Inactive Users
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={activeInactiveData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {activeInactiveData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Users by Region (Bar Chart) */}
      <Box>
        <Typography variant="h6" mb={2}>
          Users by Region
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={usersByRegionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AnalyticsChart;
