import { createFileRoute } from "@tanstack/react-router";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "@/models/User";
import { useDeleteUser, useUsersData } from "@/hooks/useUsers";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import UserModal from "@/components/App/Users/UserModal";
import { useModal } from "@/components/Shared/Modals/modalStore";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import ConfirmationModal from "@/components/Shared/Modals/ConfirmationModal";

export const Route = createFileRoute("/_authenticated/users/")({
  component: UsersPage,
  meta: () => [{ title: "Users" }],
});

function UsersPage() {
  const queryClient = useQueryClient();
  const { setOpen } = useModal();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const { isLoading, data, isError, error } = useUsersData();

  const handleOnSubmit = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    if (selectedUser) {
      notify.success("User updated successfully!");
    } else {
      notify.success("User created successfully!");
    }
  };

  const handleOpenModal = (user?: User) => {
    setOpen(<UserModal user={user} onSubmit={handleOnSubmit} />);
    setSelectedUser(user || null);
  };

  /** Delete user START */

  const onDeleteSuccess = () => {
    notify.success("User deleted successfully!");
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
  };

  const onDeleteError = (error: AxiosError) => {
    notify.error(`User deletion failed! ${error.message}`);
  };

  const { mutate: deleteUser } = useDeleteUser(onDeleteSuccess, onDeleteError);

  const handleDeleteUser = () => {
    notify.success("User deleted successfully!");
    if (userIdToDelete !== null) {
      deleteUser(userIdToDelete);
      setUserIdToDelete(null);
    }
  };

  const handleOpenConfirmationModal = (userId: number) => {
    setUserIdToDelete(userId);
    setOpen(
      <ConfirmationModal
        title="Delete User"
        description="Are you sure you want to delete this user?"
        onConfirm={handleDeleteUser}
      />
    );
  };

  /** Delete user END */

  const users: Array<User> = (data as AxiosResponse)?.data;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <h2>Users List</h2>
        <Button
          onClick={() => handleOpenModal()}
          variant="outlined"
          color="primary"
          sx={{ width: "160px" }}
        >
          Add New User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table width={"100%"} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>First name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: User) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.first_name}
                </TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email_address}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => handleOpenModal(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleOpenConfirmationModal(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
