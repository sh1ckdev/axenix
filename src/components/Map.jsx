import { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const MapComponent = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedPlacemarkId, setSelectedPlacemarkId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedCoordinates, setEditedCoordinates] = useState('');
  const [newPointName, setNewPointName] = useState('');
  const [newPointCoordinates, setNewPointCoordinates] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleGetRequest = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/salespoints');
        const data = await response.json();
        setStores(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching sales points:', error);
      }
    };

    handleGetRequest();
  }, []);

  const handlePlacemarkClick = (store) => {
    setSelectedStore(store);
    setSelectedPlacemarkId(store.id);
    setEditedName(store.name);
    setEditedCoordinates(store.coordinates);
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/salespoint/edit/${selectedStore.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editedName,
          coordinates: editedCoordinates
        })
      });
      if (response.ok) {
        const updatedStore = { ...selectedStore, name: editedName, coordinates: editedCoordinates };
        const updatedStores = stores.map(store =>
          store.id === selectedStore.id ? updatedStore : store
        );
        setStores(updatedStores);
        setSelectedStore(updatedStore);
      }
    } catch (error) {
      console.error('Error editing sales point:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/salespoint/edit/${selectedStore.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const updatedStores = stores.filter(store => store.id !== selectedStore.id);
        setStores(updatedStores);
        setSelectedStore(null);
      }
    } catch (error) {
      console.error('Error deleting sales point:', error);
    }
  };


  const handleAddPoint = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/salespoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPointName,
          coordinates: newPointCoordinates,
        }),
      });
      if (response.ok) {
        const newPoint = await response.json();
        setStores([...stores, newPoint]);
        setNewPointName('');
        setNewPointCoordinates('');
      } else {
        console.error('Failed to add sales point');
      }
    } catch (error) {
      console.error('Error adding sales point:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '700px' }}>
      <YMaps query={{ apikey: 'a0fc2686-11c2-499c-a6f0-d522a499ad8c' }}>
        <Map
          defaultState={{ center: [47.227223, 39.716916], zoom: 2 }}
          style={{ width: '100%', height: '100%' }}
        >
          {stores.map(store => (
            <Placemark
              key={store.id}
              geometry={store.coordinates}
              properties={{
                hintContent: store.name
              }}
              options={{
                preset: 'islands#blueShoppingIcon',
                iconColor: selectedPlacemarkId === store.id ? '#FF8354' : '#323232'
              }}
              onClick={() => handlePlacemarkClick(store)}
            />
          ))}
        </Map>
      </YMaps>
      <Button
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        variant="contained"
        onClick={() => setOpenModal(true)}
      >
        Add Sales Point
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#323232',
            boxShadow: 24,
            p: 4,
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Typography color="primary">Add Point</Typography>
          <TextField
            label="Name"
            value={newPointName}
            onChange={e => setNewPointName(e.target.value)}
            fullWidth
            mb={2}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              sx: {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              }
            }}
          />
          <TextField
            label="Coordinates"
            value={newPointCoordinates}
            onChange={e => setNewPointCoordinates(e.target.value)}
            fullWidth
            mb={2}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              sx: {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              }
            }}
          />
          <Button onClick={handleAddPoint} variant="contained" fullWidth>
            Add Sales Point
          </Button>
        </Box>
      </Modal>
      {selectedStore && (
        <div>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#323232',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}>          <h2>{selectedStore.name}</h2>
            <p>{selectedStore.coordinates}</p>
            <p>{selectedStore.volume}</p>
            </div>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: "30%", gap: 2, m: 2 }}>
            <TextField
              InputProps={{
                sx: {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                }
              }}
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            <TextField
              InputProps={{
                sx: {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                }
              }}
              type="text"
              value={editedCoordinates}
              onChange={(e) => setEditedCoordinates(e.target.value)}
            />
            <Button onClick={handleEdit} variant="contained" >Save Changes</Button>
            <Button onClick={handleDelete} color="error" variant='contained'>Delete</Button>
          </Box>
        </div>
      )}
    </div>

  );
};

export default MapComponent;
