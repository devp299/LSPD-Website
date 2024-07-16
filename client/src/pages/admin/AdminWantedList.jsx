import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Grid, Pagination } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminLayout from '../../components/layout/AdminLayout';
import AddWantedModal from '../../components/modals/AddWantedModal';
import EditWantedModal from '../../components/modals/EditWantedModal';
import EditWantedListModal from '../../components/modals/EditWantedListModal';

const initialWantedData = [
  {
    id: 1,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "John Doe",
    alias: "The Phantom",
    description: "Wanted for multiple counts of robbery and assault. Known for evading capture and using aliases.",
    lastSeen: "Downtown Los Santos",
    crimes: ["Robbery", "Assault"],
    caution: "Considered armed and dangerous."
  },
  {
    id: 2,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Jane Smith",
    alias: "The Viper",
    description: "Suspected in numerous cyber crimes and identity thefts. Expert in hacking and forgery.",
    lastSeen: "East Vinewood",
    crimes: ["Cyber Crime", "Identity Theft"],
    caution: "Extremely intelligent and resourceful."
  },
  {
    id: 3,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Carlos Reyes",
    alias: "The Snake",
    description: "Wanted for drug trafficking and murder. Leader of a notorious gang.",
    lastSeen: "South Los Santos",
    crimes: ["Drug Trafficking", "Murder"],
    caution: "Highly dangerous and often surrounded by gang members."
  },
  {
    id: 4,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Maria Lopez",
    alias: "Black Widow",
    description: "Suspected in several high-profile assassinations. Known to use disguises.",
    lastSeen: "Los Santos International Airport",
    crimes: ["Assassination"],
    caution: "Highly skilled and lethal."
  },
  {
    id: 5,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Victor Chang",
    alias: "The Ghost",
    description: "Wanted for organized crime activities including extortion and racketeering.",
    lastSeen: "Chinatown",
    crimes: ["Extortion", "Racketeering"],
    caution: "Elusive and well-connected."
  },
  {
    id: 6,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Nina Petrova",
    alias: "The Siren",
    description: "Involved in human trafficking and smuggling. Uses charm to manipulate victims.",
    lastSeen: "Los Santos Harbor",
    crimes: ["Human Trafficking", "Smuggling"],
    caution: "Dangerous and manipulative."
  },
  {
    id: 7,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Dmitri Ivanov",
    alias: "The Bear",
    description: "Wanted for armed robbery and kidnapping. Known for his brute strength.",
    lastSeen: "North Los Santos",
    crimes: ["Armed Robbery", "Kidnapping"],
    caution: "Extremely strong and dangerous."
  },
  {
    id: 8,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Sophia Rossi",
    alias: "The Duchess",
    description: "Involved in art thefts and illegal trading. Sophisticated and cunning.",
    lastSeen: "Rockford Hills",
    crimes: ["Art Theft", "Illegal Trading"],
    caution: "Highly intelligent and elusive."
  },
  {
    id: 9,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Javier Morales",
    alias: "The Bull",
    description: "Wanted for gang-related violence and arms trafficking. Known for his aggressive nature.",
    lastSeen: "El Burro Heights",
    crimes: ["Gang Violence", "Arms Trafficking"],
    caution: "Highly aggressive and dangerous."
  },
  {
    id: 10,
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    name: "Emily Turner",
    alias: "The Shadow",
    description: "Expert thief involved in multiple high-stake heists. Master of stealth and evasion.",
    lastSeen: "Del Perro Beach",
    crimes: ["Theft", "Heists"],
    caution: "Highly skilled and elusive."
  }
];

const AdminWantedList = () => {
  const [wantedList, setWantedList] = useState(initialWantedData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editWanted, setEditWanted] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateWanted = (newWanted) => {
    newWanted.id = wantedList.length + 1;
    setWantedList([newWanted, ...wantedList]);
  };

  const handleEditCloseModal = () => {
    setEditWanted(null);
  };

  const handleEditWanted = (updatedWanted) => {
    setWantedList(wantedList.map(wanted => wanted.id === updatedWanted.id ? updatedWanted : wanted));
    setEditModalOpen(false);
  };

  const handleDeleteWanted = (id) => {
    setWantedList(wantedList.filter(wanted => wanted.id !== id));
  };
  const handleEditCiminals = (wanted) => {
    setEditWanted(wanted);
  }

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
            <Grid item xs={12} md={6} key={wanted.id}>
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
                        sx={{ width: 150, height: 150, marginBottom: 2 }}
                        image={wanted.image ? URL.createObjectURL(wanted.image) : wanted.photo}
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
                        <strong>Crimes:</strong> {wanted.crimes.join(', ')}
                      </Typography>
                      <Typography color="text.secondary" sx={{ marginBottom: "0.5rem" }} variant="body2">
                        <strong>Caution:</strong> {wanted.caution}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Box sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  display: 'flex',
                  // gap: 1,
                }}>
                  <IconButton onClick={() => handleEditCiminals(wanted)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteWanted(wanted.id)}>
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
