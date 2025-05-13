// src/pages/admin/AnalyticsDashboard.js

import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import restaurantsData from '../../data/restaurants.json';

export default function AnalyticsDashboard() {
  const [daily, setDaily] = useState([]);
  const [byRestaurant, setByRestaurant] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Generate daily stats for April 1st to April 30th
    const dailyStats = Array.from({ length: 30 }, (_, i) => {
      const date = `Apr ${i + 1}`;
      const count = Math.floor(Math.random() * 50) + 10; // Random count between 10 and 50
      return { date, count };
    });

    // Calculate reservation totals by restaurant
    const restaurantStats = restaurantsData.map((restaurant) => {
      const totalBookings = restaurant.table_layout.reduce((sum, table) => {
        return sum + (table.maxSeats - table.available);
      }, 0);
      return {
        name: restaurant.name,
        count: totalBookings,
      };
    });

    setDaily(dailyStats);
    setByRestaurant(restaurantStats);
  }, []);

  // Paginate restaurant stats
  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return byRestaurant.slice(startIndex, startIndex + itemsPerPage);
  }, [byRestaurant, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid container spacing={4}>
      {/* Daily Counts Chart */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Daily Reservations (April 1st - April 30th)
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Totals by Restaurant */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Reservations by Restaurant
            </Typography>
            <TableContainer component={Paper}>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>Restaurant</TableCell>
                    <TableCell align="center" style={{ fontWeight: 600 }}>Reservation Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRestaurants.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.count}</TableCell>
                    </TableRow>
                  ))}
                  {paginatedRestaurants.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="textSecondary">
                          No data available.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(byRestaurant.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}