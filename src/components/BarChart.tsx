import React, { useMemo } from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { User } from "../types"

// User Data


const UsersByRegionChart: React.FC<{users: User[]}> = ({ users }) => {
  // Process user data to count users by region
  const regionData = useMemo(() => {
    const regionCounts: { [key: string]: number } = {};

    users.forEach((user) => {
      const region = user.region;
      if (regionCounts[region]) {
        regionCounts[region] += 1;
      } else {
        regionCounts[region] = 1;
      }
    });

    // Convert the counts into an array for the chart
    return Object.entries(regionCounts).map(([region, count]) => ({
      region,
      count,
    }));
  }, [users]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={regionData} barGap={10}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#003975" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default UsersByRegionChart;
