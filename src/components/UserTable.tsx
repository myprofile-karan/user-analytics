import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from "../stils/date-format";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onEdit }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Open user details dialog
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setOpenDetailsDialog(true);
  };

  // Close user details dialog
  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedUser(null);
  };

  // Open delete user dialog
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  // Close delete user dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  // Confirm delete user
  const handleConfirmDelete = () => {
    if (selectedUser) {
      onDelete(selectedUser.id);
      setOpenDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  console.log(selectedUser)

  // Define table columns
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => params.row.status ? 'Active' : 'Non-Active'
    },
    { field: "createdAt", headerName: "Created At", flex: 1.5, renderCell: (params) => formatDate(params.row.createdAt) },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleViewDetails(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="default" onClick={() => onEdit(params.row)}>
            <EditIcon /> {/* Add Edit Icon */}
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDeleteUser(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },

  ];

  return (
    <>
      {/* DataGrid Table */}
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          initialState={{
            ...users,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
          checkboxSelection
          disableSelectionOnClick
          disableRowSelectionOnClick
        />
      </Box>

      {/* User Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle align="center" fontSize={16} color="primary" fontWeight={600} >User Details</DialogTitle>
        <DialogContent sx={{ width: "300px" }} >
          {selectedUser ? (
            <>
              <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-around" }}><strong>ID:</strong> {selectedUser.id}</Typography>
              <Typography variant="body1" my={0.5} sx={{ display: "flex", justifyContent: "space-around" }}><strong>Name:</strong> {selectedUser.name}</Typography>
              <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-around" }}><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography variant="body1" my={0.5} sx={{ display: "flex", justifyContent: "space-around" }}><strong>Status:</strong> {selectedUser.phone}</Typography>
              <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-around" }}><strong>Status:</strong> {selectedUser.region}</Typography>
              <Typography variant="body1" my={0.5} sx={{ display: "flex", justifyContent: "space-around" }}><strong>Status:</strong> {selectedUser.status ? "Acitve" : "Non-Active"}</Typography>
            </>
          ) : (
            <Typography variant="body1">No user data available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle align="center" fontSize={16} color="error" fontWeight={600} >Delete User</DialogTitle>
        <DialogContent sx={{ width: "300px" }} >
          <Typography variant="body1">Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;
