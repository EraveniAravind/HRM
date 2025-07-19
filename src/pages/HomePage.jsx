import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// MUI Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupsIcon from '@mui/icons-material/Groups';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          color: 'white',
          py: 6,
          px: 2,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(to right, #2196f3, #21cbf3)',
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight={600}>
            Hospital & Appointment Management System
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
            A unified platform for hospitals, doctors, and patients to connect, manage, and consult.
          </Typography>
          <Button
            variant="contained"
            color="default"
            size="large"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Target Users Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" fontWeight={500} gutterBottom>
          Who is this platform for?
        </Typography>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <LocalHospitalIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h5" gutterBottom>
                Hospital Admins
              </Typography>
              <Typography variant="body2">
                Register hospitals, manage departments, link doctors, track consultations, and view revenues.
              </Typography>
              <Button sx={{ mt: 2 }} fullWidth onClick={() => navigate('/register')}>
                Register Hospital
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <MedicalServicesIcon color="secondary" sx={{ fontSize: 50 }} />
              <Typography variant="h5" gutterBottom>
                Doctors
              </Typography>
              <Typography variant="body2">
                Associate with hospitals, set time slots and consultation fees, track appointments & earnings.
              </Typography>
              <Button sx={{ mt: 2 }} fullWidth onClick={() => navigate('/register')}>
                Doctor Signup
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <GroupsIcon color="success" sx={{ fontSize: 50 }} />
              <Typography variant="h5" gutterBottom>
                Patients
              </Typography>
              <Typography variant="body2">
                Search and book doctors by hospital/specialization. View your consultation history.
              </Typography>
              <Button sx={{ mt: 2 }} fullWidth onClick={() => navigate('/register')}>
                Patient Signup
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 6 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom fontWeight={500}>
            Core Features of the Platform
          </Typography>

          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <EventAvailableIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={600} mt={1}>
                  Appointment Booking
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Patients can discover doctors and book available time slots in real-time.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <MonetizationOnIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={600} mt={1}>
                  Revenue Tracking
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Hospitals and doctors can view revenue from consultations, department-wise breakdowns & more.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <DashboardIcon color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={600} mt={1}>
                  Smart Dashboards
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Role-based dashboards with actionable insights for doctors, patients, and hospital admins.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h5" gutterBottom>
          Digitize your hospital's operations today.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => navigate('/login')}
        >
          Start Now
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
