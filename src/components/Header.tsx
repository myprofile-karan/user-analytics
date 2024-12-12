import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface User {
  email: string;
  // Add other properties as needed
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const user: User = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page
    localStorage.clear(); // Example for logout
    setOpenLogoutModal(false); // Close the modal after logout
  };

  const handleLogoutModal = () => setOpenLogoutModal(!openLogoutModal);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <Button color="inherit" sx={{ borderBottom: pathname === "/user-management" ? "1px solid white" : "", mr: 2 }} component={Link} to="/user-management">
            Dashboard
          </Button>
          <Button color="inherit" sx={{ borderBottom: pathname === "/analytics" ? "1px solid white" : "", mr: 2 }} component={Link} to="/analytics">
            Analytics
          </Button>
          <Button color="inherit" onClick={handleLogoutModal}>
            Logout
          </Button>
          {user &&
            <Box sx={{ width: 35, height: 35, background: "purple", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {user?.email?.charAt(0) ?? ""}
            </Box>
          }
        </Toolbar>
      </AppBar>
      <Dialog open={openLogoutModal} onClose={handleLogoutModal}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
