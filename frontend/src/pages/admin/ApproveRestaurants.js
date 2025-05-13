import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { Padding } from '@mui/icons-material';

const dummyPending = [
  {
    id: 'NEW1',
    name: 'La Taqueria',
    cuisine: 'Mexican, Tacos',
  },
  {
    id: 'NEW2',
    name: 'Sushi World',
    cuisine: 'Japanese, Sushi Bars',
  },
];

export default function ApproveRestaurants() {
  const [pending, setPending] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // TODO: replace with fetch('/api/restaurants/pending')
    setPending(dummyPending);
  }, []);

  const handleApprove = (id, name) => {
    // TODO: call POST /api/restaurants/:id/approve
    setPending((prev) => prev.filter((r) => r.id !== id));
    setSnackbar({ open: true, message: `Approved restaurant: ${name}`, severity: 'success' });
  };

  const handleReject = (id, name) => {
    // TODO: call POST /api/restaurants/:id/reject
    setPending((prev) => prev.filter((r) => r.id !== id));
    setSnackbar({ open: true, message: `Rejected restaurant: ${name}`, severity: 'error' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Cuisine</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pending.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.cuisine}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleApprove(r.id, r.name)}
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleReject(r.id, r.name)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {pending.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    No pending restaurants to approve.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
