import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Grid, Pagination } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminLayout from '../../components/layout/AdminLayout';
import AddWantedModal from '../../components/modals/AddWantedModal';
import EditWantedListModal from '../../components/modals/EditWantedListModal';
import { createListItem, deleteList, getList, updateList } from '../../api';

const AdminWantedList = () => {
  const [wantedList, setWantedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editWanted, setEditWanted] = useState(null);

  useEffect(() => {
    fetchWantedList();
  }, []);

  const fetchWantedList = async () => {
    try {
      const response = await getList();
      setWantedList(response);
    } catch (error) {
      console.error('Error fetching wanted list:', error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateWanted = async (newWanted) => {
    try {
      const response = await createListItem(newWanted);
      setWantedList([response, ...wantedList]);
      setModalOpen(false);
    } catch (error) {
      console.error('Error creating wanted item:', error);
    }
  };

  const handleEditCloseModal = () => {
    setEditWanted(null);
    setEditModalOpen(false);
  };

  const handleEditWanted = async (updatedWanted) => {
    try {
      const response = await updateList(updatedWanted._id, updatedWanted);
      setWantedList(wantedList.map(wanted => wanted._id === updatedWanted._id ? response : wanted));
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating wanted item:', error);
    }
  };

  const handleDeleteWanted = async (listId) => {
    try {
      await deleteList(listId);
      setWantedList(wantedList.filter(wanted => wanted._id !== listId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEditCiminals = (wanted) => {
    setEditWanted(wanted);
    setEditModalOpen(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWantedList = wantedList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AdminLayout>
      <IconButton
        sx={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "60px",
          height: "60px",
          backgroundColor: "#4CAF50",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1000",
          transition: "background-color 0.3s ease, transform 0.2s ease-out",
          '&:hover': {
            backgroundColor: "#4CAD12",
            transform: "scale(1.1)",
          },
        }}
        onClick={handleOpenModal}
      >
        <AddIcon fontSize='large' />
      </IconButton>
      <Box className="wanted-list-container">
        <Grid container spacing={3}>
          {currentWantedList.map((wanted) => (
            <Grid item xs={12} md={6} key={wanted._id}>
              <Card
                className="wanted-card"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CardMedia
                        sx={{ width: 150, height: 150, marginBottom: 2, borderRadius: "50%" }}
                        image={wanted.image.url}
                        alt={wanted.name}
                      />
                      <Typography sx={{ fontFamily: "Russo One", whiteSpace: 'nowrap' }} gutterBottom variant="h6" component="div">
                        {wanted.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
                        {wanted.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
                        <strong>Alias:</strong> {wanted.alias}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
                        <strong>Last Seen:</strong> {wanted.lastSeen}
                      </Typography>
                      <Typography color="text.secondary" sx={{ marginBottom: "0.5rem" }} variant="body2">
                        <strong>Crimes:</strong> {wanted.crimes}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Box sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  display: 'flex',
                }}>
                  <IconButton onClick={() => handleEditCiminals(wanted)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteWanted(wanted._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination
        count={Math.ceil(wantedList.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="pagination"
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
      <AddWantedModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateWanted} />
      {editWanted && (
        <EditWantedListModal onClose={handleEditCloseModal} wanted={editWanted} onEdit={handleEditWanted} />
      )}
    </AdminLayout>
  );
};

export default AdminWantedList;
