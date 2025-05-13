import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Check as CheckIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function RestaurantManagerDashboard() {
  // Restaurant info state
  const [info, setInfo] = useState({
    name: 'The Melt',
    address: 'Sunnyvale, CA, 94086',
    contact: 'None',
    openingTime: '09:00',
    closingTime: '22:00',
    description: 'A cozy place to dine.',
    tableLayout: [
      { time: '17:30', maxSeats: 4 },
      { time: '18:00', maxSeats: 4 },
    ],
    photos: []
  });

  // Temporary edit state
  const [editInfo, setEditInfo] = useState(info);

  // Dummy reservations
  const dummyReservations = [
    { id: 'r1', time: '17:30', customerName: 'Alice', partySize: 2, status: 'confirmed' },
    { id: 'r2', time: '18:00', customerName: 'Bob', partySize: 4, status: 'pending' },
    { id: 'r3', time: '18:30', customerName: 'Charlie', partySize: 3, status: 'cancelled' },
    { id: 'r4', time: '19:00', customerName: 'Dana', partySize: 1, status: 'confirmed' },
  ];

  // Reservation state
  const [reservations, setReservations] = useState(dummyReservations);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // UI state
  const [error, setError] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  // Open edit dialog and initialize temp state
  const handleEditOpen = () => {
    setEditInfo(info);
    setOpenEdit(true);
  };
  const handleEditClose = () => setOpenEdit(false);

  // EditInfo change handlers
  const handleEditInfoChange = (field, value) => {
    setEditInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setEditInfo(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };
  const removePhoto = (index) => {
    setEditInfo(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSlotChange = (index, field, value) => {
    setEditInfo(prev => {
      const copy = [...prev.tableLayout];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, tableLayout: copy };
    });
  };
  const addSlot = () => {
    setEditInfo(prev => ({
      ...prev,
      tableLayout: [...prev.tableLayout, { time: '', maxSeats: '' }]
    }));
  };
  const removeSlot = (index) => {
    setEditInfo(prev => ({
      ...prev,
      tableLayout: prev.tableLayout.filter((_, i) => i !== index)
    }));
  };

  // Save edits to main info state
  const handleSave = () => {
    setInfo(editInfo);
    setOpenEdit(false);
  };

  const startEditing = (reservation) => {
    setEditingId(reservation.id);
    setEditStatus(reservation.status);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditStatus('');
  };

  const saveStatus = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: editStatus } : r));
    setEditingId(null);
  };

  const handleDeleteRes = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "30px" }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Restaurant Info Card */}
      <Card sx={{ mb: 4, p: 2, position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">{info.name}</Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditOpen}
            >
              Edit Restaurant
            </Button>
          </Box>
          <Typography sx={{ mt: 1 }}>Address: {info.address}</Typography>
          <Typography>Contact: {info.contact}</Typography>
          <Typography>
            Hours: {info.openingTime} – {info.closingTime}
          </Typography>
          <Typography sx={{ mt: 2 }}>{info.description}</Typography>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Reservations</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={setSelectedDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Party Size</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.time}</TableCell>
                <TableCell>{r.customerName}</TableCell>
                <TableCell>{r.partySize}</TableCell>
                <TableCell>
                  {editingId === r.id ? (
                    <TextField
                      select
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value)}
                      size="small"
                    >
                      {['confirmed','pending','cancelled'].map(s => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    r.status
                  )}
                </TableCell>
                <TableCell>
                  {editingId === r.id ? (
                    <>
                      <IconButton color="primary" onClick={() => saveStatus(r.id)}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={cancelEditing}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton color="primary" onClick={() => startEditing(r)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteRes(r.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Restaurant Dialog */}
      <Dialog open={openEdit} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Restaurant Information</DialogTitle>
        <DialogContent>
          {/* Form Fields bound to editInfo */}
          <TextField
            fullWidth
            margin="normal"
            label="Restaurant Name"
            value={editInfo.name}
            onChange={e => handleEditInfoChange('name', e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            value={editInfo.address}
            onChange={e => handleEditInfoChange('address', e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact Info"
            value={editInfo.contact}
            onChange={e => handleEditInfoChange('contact', e.target.value)}
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Opening Time"
                type="time"
                value={editInfo.openingTime}
                onChange={e => handleEditInfoChange('openingTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Closing Time"
                type="time"
                value={editInfo.closingTime}
                onChange={e => handleEditInfoChange('closingTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={3}
            value={editInfo.description}
            onChange={e => handleEditInfoChange('description', e.target.value)}
          />

          {/* Photos Upload */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Photos</Typography>
          <Button variant="outlined" component="label">
            Upload Photos
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </Button>
          <Box sx={{ mt: 1 }}>
            {editInfo.photos.map((file, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography sx={{ flexGrow: 1 }}>{file.name}</Typography>
                <IconButton size="small" onClick={() => removePhoto(idx)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Table Layout Editor */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Table Layout</Typography>
          {editInfo.tableLayout.map((slot, idx) => (
            <Grid container spacing={2} alignItems="center" key={idx} sx={{ mt: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={slot.time}
                  onChange={e => handleSlotChange(idx, 'time', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Max Seats"
                  type="number"
                  value={slot.maxSeats}
                  onChange={e => handleSlotChange(idx, 'maxSeats', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="error" onClick={() => removeSlot(idx)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={addSlot}>
            Add Slot
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}