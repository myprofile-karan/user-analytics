import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchUsers } from "../features/usersSlice";
import { Box, Typography, Button, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks"; // Import to access users from the Redux store
import CustomTextField from "../components/CustomTextfield"; // Import your custom component
import toast from "react-hot-toast";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { users } = useAppSelector((state) => state.users);  // Fetch users from store

    const [newUser, setNewUser] = useState({ name: "", email: "", password: ""});
    const [error, setError] = useState<string | null>(null); 

    // Fetch users initially
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Handle login logic
    const handleLogin = () => {
        try {
            // Check if user exists
            const foundUser = users.find(
                (user) => user.email === newUser.email && user.password === newUser.password
            );

            if (foundUser) {
                // If the user is found, save user info in localStorage and navigate to another page (e.g., dashboard)
                localStorage.setItem("currentUser", JSON.stringify(foundUser));
                navigate("/user-management");
                toast.success("Login successful");
            } else {
                // Show an error message if the user is not found
                setError("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login. Please try again.");
        }
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bgcolor="#f4f4f4"
            >
                <Paper elevation={3} style={{ padding: "40px", maxWidth: "400px", display: "flex", flexDirection: "column" }}>
                    <Box>
                        <Typography variant="h5" align="center" gutterBottom>
                            Login
                        </Typography>

                        <Box >
                            <Typography fontSize={12}>Email: new@gmail.com</Typography>
                            <Typography fontSize={12}>Pawwrod: 123456</Typography>
                        </Box>
                        {/* Render error message if login fails */}
                        {error && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <CustomTextField
                            label="Email"
                            value={newUser.email}
                            type="text"
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <CustomTextField
                            label="Password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />

                        {/* Checkbox for Show Active Users */}
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={newUser.status}
                                        onChange={(e) => setNewUser({ ...newUser, status: e.target.checked })}
                                        color="primary"
                                    />
                                }
                                label="Active"
                                style={{ marginTop: "10px" }}
                            /> */}
                    </Box>

                    <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
};

export default DashboardPage;
