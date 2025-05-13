import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Alert,
  MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ManageRestaurants from './admin/ManageRestaurants';
import ApproveRestaurants from './admin/ApproveRestaurants';
import AnalyticsDashboard from './admin/AnalyticsDashboard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          {/* <Tab label="Restaurants" />
          <Tab label="Users" /> */}
          <Tab label="Restaurants" />
          <Tab label="Approve" />
          <Tab label="Analytics" />
        </Tabs>

        {activeTab === 0 && <ManageRestaurants />}
        {activeTab === 1 && <ApproveRestaurants />}
        {activeTab === 2 && <AnalyticsDashboard />}
      </Box>

    </Container>
  );
};

export default AdminDashboard; 