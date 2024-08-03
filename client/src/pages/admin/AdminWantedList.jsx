import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddWantedModal from '../../components/modals/AddWantedModal';
import EditWantedListModal from '../../components/modals/EditWantedListModal';
import { createListItem, deleteList, getList, updateList } from '../../api';
import '../../css/adminWantedList.css';
import { IconButton } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import toast from 'react-hot-toast';

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
      // toast.error(error.response.data.message);
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

  const handleEditCriminals = (wanted) => {
    setEditWanted(wanted);
    setEditModalOpen(true);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentWantedList = wantedList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AdminLayout>
      <IconButton
        sx={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "70px",
          height: "70px",
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
        className="add-job-button"
        onClick={handleOpenModal}
      >
        <AddIcon fontSize='large' />
      </IconButton>
      {/* <button className="add-wanted-button" onClick={handleOpenModal}>
        +
      </button> */}
      <div className="wanted-list-container">
        <TransitionGroup component={null}>
        {wantedList.map((wanted) => (
          <CSSTransition
            key={wanted._id}
            timeout={500}
            classNames="wanted-card-transition"
          >
          <div key={wanted._id} className="wanted-card">
            <div className="wanted-card-content">
              <div className="wanted-image-container">
                <img src={wanted.image.url} alt={wanted.name} className="wanted-image" />
                <div className='details-container'>
                  <p className="wanted-alias"><strong>Alias:</strong> {wanted.alias}</p>
                  <p className="wanted-last-seen"><strong>Last Seen:</strong> {wanted.lastSeen}</p>
                  <p className="wanted-crimes"><strong>Crimes:</strong> {wanted.crimes}</p>
                </div>
              </div>
              
              <div className="wanted-details">
                <h2 className="wanted-name">{wanted.name}</h2>
                <p className="wanted-description">{wanted.description}</p>
                <div className="wanted-actions">
                    <IconButton className='edit-button' onClick={() => handleEditCriminals(wanted)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton className='delete-button' onClick={() => handleDeleteWanted(wanted._id)}>
                      <DeleteIcon />
                    </IconButton>
                    {/* <button className="edit-button" onClick={() => handleEditCriminals(wanted)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDeleteWanted(wanted._id)}>Delete</button> */}
              </div>
              </div>
            </div>
          </div>
          </CSSTransition>
        ))}
        </TransitionGroup>
      </div>
      {/* <div className="pagination">
        {Array.from({ length: Math.ceil(wantedList.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div> */}
      <AddWantedModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateWanted} />
      {editWanted && (
        <EditWantedListModal onClose={handleEditCloseModal} wanted={editWanted} onEdit={handleEditWanted} />
      )}
    </AdminLayout>
  );
};

export default AdminWantedList;