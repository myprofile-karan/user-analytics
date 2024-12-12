import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Paper,
    Button,
    Modal,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
    CircularProgress,
} from "@mui/material";
import UserTable from "../components/UserTable";
import { deleteUser, fetchUsers, addUser, updateUser } from "../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import SearchBar from "../components/SearchBar";
import CustomTextField from "../components/CustomTextfield";
import toast from "react-hot-toast";

const UserDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, isLoading } = useSelector((state: RootState) => state.users as { users: any[], isLoading: boolean });

    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal State
    const [openModal, setOpenModal] = useState(false);

    // New User State for Add/Edit
    const [newUser, setNewUser] = useState({
        id: "", // For editing
        name: "",
        email: "",
        password: "",
        phone: "",
        region: "",
        status: false,
    });
    const [isEditing, setIsEditing] = useState(false); // Track add or edit mode

    // Region options
    const regions = ["North", "South", "East", "West", "North-East", "South-East", "South-West", "North-West"];

    // Fetch users when component mounts
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Update filtered users based on search query
    useEffect(() => {
        setFilteredUsers(
            users.filter(
                (user: any) =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.region?.toLowerCase().includes(searchQuery.toLowerCase()) 
            )
        );
    }, [users, searchQuery]);

    // Handle Delete User
    const handleDeleteUser = (id: string) => {
        dispatch(deleteUser(id));
        toast.success("User deleted successfully");
    };

    // Handle Add/Edit User
    const handleAddOrEditUser = async () => {
        if (!newUser.name || !newUser.email || !newUser.phone || !newUser.region) {
            toast.error("Please enter all fields");
            return;
        }

        try {
            if (isEditing) {
                // Update existing user
                await dispatch(updateUser({ id: newUser.id, data: newUser }));
                toast.success("User updated successfully");
            } else {
                // Add new user
                await dispatch(addUser(newUser));
                toast.success("User added successfully");
            }

            setOpenModal(false); // Close modal
            resetForm(); // Reset form fields
        } catch (error) {
            toast.error("Failed to add or edit user");
            console.error("Error adding or editing user:", error);
        }
    };


    // Reset form state
    const resetForm = () => {
        setNewUser({ id: "", name: "", email: "", password: "", phone: "", region: "", status: false });
        setIsEditing(false);
    };

    // Handle Edit User Action
    const handleEditUser = (user: any) => {
        setNewUser(user);
        setIsEditing(true);
        setOpenModal(true);
    };


    return (
        <>
            {isLoading &&
                <CircularProgress sx={{ color: "#003975", alignItems: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
            }
            < Container maxWidth="lg" style={{ marginTop: "70px" }}>
                <Typography variant="h6" fontWeight={900} gutterBottom align="center">
                    User Management Dashboard
                </Typography>
                <Paper elevation={3} style={{ padding: "20px" }}>
                    {/* Search Bar */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                        <SearchBar onSearch={(query) => setSearchQuery(query)} />
                        {/* Add User Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => {
                                resetForm();
                                setOpenModal(true);
                            }}
                            sx={{ width: 100, py: 1, fontSize: 12 }}
                        >
                            Add User
                        </Button>
                    </Box>

                    {/* User Table */}
                    <UserTable
                        users={filteredUsers}
                        onDelete={handleDeleteUser}
                        onEdit={handleEditUser} // Pass edit handler
                    />

                    {/* Circular Progress for loading */}
                </Paper>

                {/* Add/Edit User Modal */}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" mb={2} align="center">
                            {isEditing ? "Edit User" : "Add New User"}
                        </Typography>
                        <CustomTextField
                            label="Name"
                            value={newUser.name}
                            type={"text"}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <CustomTextField
                            label="Email"
                            value={newUser.email}
                            type="email"
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <CustomTextField
                            label="Password"
                            value={newUser.password}
                            type="email"
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <CustomTextField
                            label="Phone Number"
                            value={newUser.phone}
                            type="number"
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        />

                        {/* Region Select Field */}

                        <FormControl
                            fullWidth
                            margin="normal"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px", // Rounded corners
                                    height: "45px", // Reduced height
                                    "& fieldset": {
                                        borderColor: "#ccc", // Default border color
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#666", // Hover border color
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#1976d2", // Focus border color
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: "14px", // Smaller label font size
                                    color: "#666", // Label color
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "14px", // Input text font size
                                    padding: "10px", // Adjust padding for smaller height
                                },
                            }}
                        >
                            <InputLabel>Region</InputLabel>
                            <Select
                                value={newUser.region}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, region: e.target.value })
                                }
                                label="Region"
                            >
                                {regions.map((region) => (
                                    <MenuItem key={region} value={region}>
                                        {region}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Status Select Field */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={newUser.status}
                                    onChange={(e) => setNewUser({ ...newUser, status: e.target.checked })}
                                    color="primary"
                                />
                            }
                            label="Active"
                            style={{ marginTop: "10px" }}
                        />

                        {/* Action Buttons */}
                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <Button variant="outlined" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddOrEditUser}
                            >
                                {isEditing ? "Update" : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Container >
        </>
    );
};

export default UserDashboard;
