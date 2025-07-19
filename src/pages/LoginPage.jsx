// import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';

// Roles
const roles = [
  { label: 'Hospital Admin', value: 'admin' },
  { label: 'Doctor', value: 'doctor' },
  { label: 'Patient', value: 'patient' },
];

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(4).required('Password is required'),
  role: yup.string().required('Role is required'),
});

const LoginPage = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (data) => {
    // Simulated login API
    const fakeUser = {
      id: 1,
      name: 'John Doe',
      email: data.email,
    };
    const fakeToken = 'dummy-jwt-token';

    dispatch(login({ user: fakeUser, token: fakeToken, role: data.role }));
    enqueueSnackbar('Login successful!', { variant: 'success' });

    switch (data.role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'doctor':
        navigate('/doctor/dashboard');
        break;
      case 'patient':
        navigate('/patient/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" align="center" mb={3}>
          Hospital Portal Login
        </Typography>

        <form noValidate onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                autoComplete="email"
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                autoComplete="current-password"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {/* Role Select */}
          <Controller
            name="role"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Login Role"
                select
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message || 'Select your user role'}
              >
                {roles.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
