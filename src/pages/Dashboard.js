// import React, { useState } from "react";
// import {
//     Button, Typography, Switch, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     TablePagination,
//     Grid, Tooltip, Box
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import PrimarySearchAppBar from "../components/Navbar";
// import { handleAddNotes, handleCreateDialog, handleDeleteDialog, handleDeleteNote, handleUpdateNote,handleChangePage,handleChangeRowsPerPage, handleStatus } from "../redux/notesSlice";
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import InfoIcon from '@mui/icons-material/Info';

// function Dashboard() {
//     const { createNotesDialog, deleteNotesDialog } = useSelector((state) => state.notes.dialogState);
//     const { notes } = useSelector((state) => state.notes);
//     const { searchInput } = useSelector((state) => state.notes);
//     const { page } = useSelector((state) => state.notes.pagination);
//     const { rowsPerPage } = useSelector((state) => state.notes.pagination);
//     const [editData, setEditData] = useState(null);
//     const [noteId, setNoteId] = useState(null);
//     const dispatch = useDispatch();
//     const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchInput.toLowerCase()));
//     const startIndex = page * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;
//     const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

//     const ChangePage = (event, newPage) => {
//         const maxPage = Math.ceil(filteredNotes.length / rowsPerPage) - 1;
//         const clampedPage = Math.min(newPage, maxPage);
//         dispatch(handleChangePage(clampedPage));
//     };
    
    
//     const ChangeRowsPerPage = (event) => {
//         dispatch(handleChangeRowsPerPage(parseInt(event.target.value, 10)));
//         dispatch(handleChangePage(0));
//     };

//     const handleNotesStatus = (notesId) => {
//         dispatch(handleStatus(notesId))
//     }

//     const handleDialogOpen = (data = null) => {
//         if (data) {
//             setEditData(data);
//         } else {
//             setEditData(null);
//         }
//         dispatch(handleCreateDialog(true));
//     };

//     const handleDialogClose = () => {
//         dispatch(handleCreateDialog(false));
//         setEditData(null);
//     };

//     const handleSubmit = async (values, { resetForm }) => {
//         if (editData) {
//             dispatch(handleUpdateNote({ ...editData, ...values }));
//         } else {
//             const timestamp = new Date().getTime();
//             const uniqueId = notes.length + 1 + "_" + timestamp;
//             dispatch(handleAddNotes({ id: uniqueId, ...values }));
//         }
//         handleDialogClose();
//         resetForm();
//     };

//     const handleUpdate = (note) => {
//         handleDialogOpen(note);
//     };

//     const handleDelete = (id) => {
//         dispatch(handleDeleteDialog(true));
//         setNoteId(id)
//     }

//     const deleteNote = () => {
//         dispatch(handleDeleteNote(noteId));
//         dispatch(handleDeleteDialog(false));
//     }
//     const CreateNotesValidationSchema = Yup.object().shape({
//         title: Yup.string().min(3, "Title is too short").required("Required"),
//         description: Yup.string().required("Required"),
//     });

//     return (
//         <>
//             <PrimarySearchAppBar />
//             <Dialog open={createNotesDialog} onClose={handleDialogClose}>
//                 <Formik
//                     initialValues={{
//                         title: editData ? editData.title : '',
//                         description: editData ? editData.description : '',
//                     }}
//                     validationSchema={CreateNotesValidationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {(formik) => (
//                         <Form>
//                             <DialogTitle className="bg-[#818cf8] text-white">
//                                 {editData ? "Update Notes" : "Create Notes"}
//                             </DialogTitle>
//                             <DialogContent className="mt-3" >
//                                 <DialogContentText>
//                                     {editData ? "" : "To Create Notes, please enter Title and Description here."}
//                                 </DialogContentText>
//                                 <TextField
//                                     required
//                                     type='text'
//                                     name='title'
//                                     placeholder='Title'
//                                     value={formik.values.title}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     id="outlined-required"
//                                     label="Title"
//                                     error={formik.touched.title && Boolean(formik.errors.title)}
//                                     helperText={formik.touched.title && formik.errors.title}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                                 <TextField
//                                     required
//                                     multiline
//                                     rows={4}
//                                     type='text'
//                                     name='description'
//                                     placeholder='Description'
//                                     value={formik.values.description}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     id="outlined-required"
//                                     label="Description"
//                                     error={formik.touched.description && Boolean(formik.errors.description)}
//                                     helperText={formik.touched.description && formik.errors.description}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button onClick={handleDialogClose} sx={{
//                                     backgroundColor: "lightgrey", borderRadius: 1, color: "black", textTransform: 'capitalize', "&:hover": {
//                                         backgroundColor: "gray", color: '#fff'
//                                     }
//                                 }}>Cancel</Button>
//                                 <Button type="submit" disabled={formik.isSubmitting} sx={{
//                                     border: '1px solid #818cf8', borderRadius: 1, color: '#fff', textTransform: 'capitalize', backgroundColor: '#818cf8', '&:hover': {
//                                         backgroundColor: '#fff', color: '#818cf8',
//                                     },
//                                 }}>
//                                     {editData ? "Update" : "Create"}
//                                 </Button>
//                             </DialogActions>
//                         </Form>
//                     )}
//                 </Formik>

//             </Dialog>
//             <div>
//                 <Grid container width='90%' marginInline='auto'>
//                     <Grid container item justifyContent='space-between' alignItems='center' sx={{ paddingTop: "2%" }}>
//                         <Typography variant="h5">List of Notes</Typography>
//                         <Button onClick={() => handleDialogOpen()} sx={{
//                             border: '1px solid #818cf8', borderRadius: 1, color: '#fff', textTransform: 'capitalize', backgroundColor: '#818cf8', '&:hover': {
//                                 backgroundColor: '#fff', color: '#818cf8',
//                             },
//                         }}><NoteAddIcon fontSize="medium" />&nbsp;
//                             Create Notes
//                         </Button>
//                     </Grid>
//                     <TableContainer component={Paper} sx={{ width: "100%", marginTop: '1%' }}>
//                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                             <TableHead sx={{ backgroundColor: '#818cf8' }}>
//                                 <TableRow >
//                                     <TableCell sx={{ color: '#fff' }}>Id</TableCell>
//                                     <TableCell sx={{ color: '#fff' }}>Title</TableCell>
//                                     <TableCell sx={{ color: '#fff' }}>Description</TableCell>
//                                     <TableCell sx={{ color: '#fff' }}>Status</TableCell>
//                                     <TableCell sx={{ color: '#fff' }}>Action</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {paginatedNotes.length > 0 && (
//                                     paginatedNotes.map((row, index) => (
//                                         <TableRow
//                                             key={row.id}
//                                             sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                         >
//                                             <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                             <TableCell component="th" scope="row">
//                                                 {row.title}
//                                             </TableCell>
//                                             <TableCell>{row.description}</TableCell>
//                                             <TableCell>
//                                             <Switch checked={row?.status ?? false} 
//                                             onClick={() => handleNotesStatus(row.id)} 
//                                             sx={{color: '#818cf8 !important'}}/>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Box display="flex" alignItems="center" spacing={4}>
//                                                     <Tooltip title="Edit">
//                                                         <ModeEditIcon
//                                                             fontSize="small"
//                                                             onClick={() => handleUpdate(row)}
//                                                             className="cursor-pointer text-[#818cf8]"
//                                                             style={{ marginRight: '16px' }} 
//                                                         />
//                                                     </Tooltip>
//                                                     <Tooltip title="Delete">
//                                                         <DeleteIcon
//                                                             fontSize="small"
//                                                             onClick={() => handleDelete(row.id)}
//                                                             className="cursor-pointer text-red-500"
//                                                         />
//                                                     </Tooltip>
//                                                 </Box>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 )}
//                             </TableBody>
//                         </Table>
//                         {paginatedNotes.length <= 0 && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
//                             <Grid item>
//                                 <InfoIcon sx={{ color: '#818cf8', fontSize: 40 }} />
//                             </Grid>
//                             <Grid item>
//                                 <Typography fontSize={18} fontWeight={600}>Notes Not Found!!</Typography>
//                             </Grid>
//                         </Grid>}
//                         <TablePagination
//                             rowsPerPageOptions={[]}
//                             component="div"
//                             count={filteredNotes.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={ChangePage}
//                             onRowsPerPageChange={ChangeRowsPerPage}
//                         />
//                     </TableContainer>

//                     <Dialog
//                         open={deleteNotesDialog}
//                         onClose={() => dispatch(handleDeleteDialog(false))}
//                     >
//                         <DialogTitle className="bg-[#818cf8] text-white">Delete Notes</DialogTitle>
//                         <DialogContent className="mt-3">
//                             <DialogContentText>
//                                 Are you sure you want to delete this note?
//                             </DialogContentText>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => dispatch(handleDeleteDialog(false))} sx={{
//                                 backgroundColor: "lightgrey", borderRadius: 1, color: "black", textTransform: 'capitalize', "&:hover": {
//                                     backgroundColor: "gray", color: '#fff'
//                                 }
//                             }}>Cancel</Button>
//                             <Button onClick={() => deleteNote()} sx={{
//                                 border: '1px solid #818cf8', borderRadius: 1, color: '#fff', textTransform: 'capitalize', backgroundColor: '#818cf8', '&:hover': {
//                                     backgroundColor: '#fff', color: '#818cf8',
//                                 },
//                             }}>
//                                 Delete
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Grid>
//             </div>
//         </>
//     );
// }

// export default Dashboard;



// Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination,
  Grid, Tooltip, Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PrimarySearchAppBar from "../components/Navbar";
import { getUsers, createUser, updateUser, deleteUser } from "../redux/notesSlice";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

function Dashboard() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [editData, setEditData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDialogOpen = (data = null) => {
    if (data) {
      setEditData(data);
    } else {
      setEditData(null);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditData(null);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (editData) {
      dispatch(updateUser({ id: editData._id, ...values }));
    } else {
      dispatch(createUser(values));
    }
    handleDialogClose();
    resetForm();
  };

  const handleUpdate = (user) => {
    handleDialogOpen(user);
  };

  const handleDelete = (id) => {
    setUserId(id);
    setDeleteDialogOpen(true);
  };

  const deleteUserById = () => {
    dispatch(deleteUser(userId));
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <>
      <PrimarySearchAppBar />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <Formik
          initialValues={{
            firstName: editData ? editData.firstName : '',
            lastName: editData ? editData.lastName : '',
            email: editData ? editData.email : '',
            password: editData ? editData.password : '',
            role: editData ? editData.role : '',
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            role: Yup.string().required('Role is required'),
          })}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <DialogTitle>{editData ? 'Update User' : 'Create User'}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {editData ? '' : 'To create a new user, please enter the details below.'}
                </DialogContentText>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                  required
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  required
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  required
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  required
                  margin="dense"
                  id="role"
                  name="role"
                  label="Role"
                  fullWidth
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit" color="primary">
                  {editData ? 'Update' : 'Create'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={deleteUserById} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Typography variant="h5">User Management</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
            Add User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <ModeEditIcon onClick={() => handleUpdate(user)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteIcon onClick={() => handleDelete(user._id)} style={{ cursor: 'pointer', color: 'red' }} />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {filteredUsers.length === 0 && (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
              <InfoIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">No users found</Typography>
            </Grid>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
