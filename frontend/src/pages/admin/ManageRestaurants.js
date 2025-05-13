import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import restaurantsData from '../../data/restaurants.json';
import Pagination from '@mui/material/Pagination';

export default function ManageRestaurants() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Calculate bookings_today based on table layouts
    const updatedRestaurants = restaurantsData.map((restaurant) => {
      const totalBookings = restaurant.table_layout.reduce((sum, table) => {
        return sum + (table.maxSeats - table.available);
      }, 0);
      return {
        ...restaurant,
        bookings_today: totalBookings > 0 ? totalBookings : 1, // Ensure bookings_today is not 0
      };
    });
    setList(updatedRestaurants);
  }, []);

  // memoize filtered list
  const filtered = useMemo(() => {
    const lc = searchTerm.toLowerCase();
    return list.filter(
      (r) =>
        r.name.toLowerCase().includes(lc) ||
        r.cuisine.toLowerCase().includes(lc)
    );
  }, [list, searchTerm]);

  // Paginate filtered list
  const paginated = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage]);

  const handleRemove = (id) => {
    // TODO: call DELETE /api/restaurants/:id
    setList((prev) => prev.filter((r) => r.id !== id));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Card sx={{ my: 4 }}>
      <CardContent>
        {/* Search field */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Search restaurants..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Restaurant Name</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Cuisine</TableCell>
                <TableCell align="center" style={{ fontWeight: 600 }}>Bookings Today</TableCell>
                <TableCell align="center" style={{ fontWeight: 600 }} >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.cuisine}</TableCell>
                  <TableCell align="center">{r.bookings_today}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(r.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    No restaurants match “{searchTerm}”
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(filtered.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
