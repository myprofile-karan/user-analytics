import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi, addUserApi, updateUserApi, deleteUserApi } from "../api/mockApi";
import { User } from "../types";

// Thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchUsersApi();
});

export const addUser = createAsyncThunk("users/addUser", async (newUser: any) => {
  return await addUserApi(newUser);
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ id, data }: any) => {
  return await updateUserApi(id, data);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
  await deleteUserApi(id);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    isLoading: false, // Tracks loading state
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addUser.rejected, (state) => {
        state.isLoading = false;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user: any) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user: any) => user.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
