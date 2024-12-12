import axios from "axios";

// Base API URL
const API_URL = "https://675802f7c0a427baf94ef948.mockapi.io/users";

// Fetch all users
export const fetchUsersApi = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new user
export const addUserApi = async (user: {
  name: string;
  email: string;
  password: string;
  phone: string;
  region: string;
  status: boolean;
}) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Update an existing user
export const updateUserApi = async (id: string, updatedData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a user
export const deleteUserApi = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchAnalyticsData = async () => {
  return {
    totalUsers: 50,
    activeUsers: 25,
    deletedUsers: 5,
    userRegistrations: [
      { month: "Jan", count: 5 },
      { month: "Feb", count: 8 },
      { month: "Mar", count: 12 },
      { month: "Apr", count: 10 },
      { month: "May", count: 15 },
      { month: "Jun", count: 20 },
    ],
    regionData: [
      { region: "North", count: 15 },
      { region: "South", count: 10 },
      { region: "East", count: 12 },
      { region: "West", count: 13 },
    ],
  };
};
