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
  IconButton,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    isActive: true
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive
      });
    } else {
      setEditingUser(null);
      setForm({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingUser 
        ? `http://localhost:5000/api/users/${editingUser._id}`
        : 'http://localhost:5000/api/users';
      
      const method = editingUser ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        fetchUsers();
        handleCloseDialog();
      } else {
        const data = await response.json();
        setError(data.message || 'Operation failed');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchUsers();
      } else {
        setError('Failed to deactivate user');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && users.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#F5F7FB', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 }, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight={700}>Users Management</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                sx: { borderRadius: 2, background: '#F5F7FB' }
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #6C63FF 60%, #5A55E0 100%)',
                color: '#fff',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '1rem',
                px: 3,
                py: 1.2,
                boxShadow: '0 4px 16px rgba(108,99,255,0.10)',
                textTransform: 'none',
                '&:hover': { background: '#5A55E0' }
              }}
              onClick={() => handleOpenDialog()}
            >
              Add User
            </Button>
          </Box>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(108,99,255,0.04)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#F5F7FB' }}>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#F5F7FB' } }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip label={user.role} color={user.role === 'admin' ? 'primary' : 'default'} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={user.isActive ? 'Active' : 'Inactive'} color={user.isActive ? 'success' : 'default'} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenDialog(user)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user._id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Dialog for Add/Edit User */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Name" name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} fullWidth required sx={{ borderRadius: 2 }} />
              <TextField label="Email" name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} fullWidth required sx={{ borderRadius: 2 }} />
              <TextField label="Phone" name="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} fullWidth required sx={{ borderRadius: 2 }} />
              <FormControl fullWidth sx={{ borderRadius: 2 }}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={form.role} label="Role" onChange={e => setForm({ ...form, role: e.target.value })}>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ borderRadius: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select name="isActive" value={form.isActive} label="Status" onChange={e => setForm({ ...form, isActive: e.target.value === 'true' })}>
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog} variant="text" sx={{ fontWeight: 600 }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ fontWeight: 600 }}>{editingUser ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UsersManagement; 