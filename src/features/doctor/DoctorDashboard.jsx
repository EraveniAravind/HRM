import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Divider, Chip, List, ListItem, CircularProgress
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [overview, setOverview] = useState({ consultations: 0, earnings: 0 });

  useEffect(() => {
    const loadAppointmentsFromLocalStorage = () => {
      const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      setAppointments(savedAppointments);

      const doctorEarnings = savedAppointments.reduce((sum, appt) => {
        return sum + (appt.fee ? appt.fee * 0.6 : 0);
      }, 0);

      setOverview({
        consultations: savedAppointments.length,
        earnings: doctorEarnings.toFixed(2),
      });

      // Dummy hospital summary (you can enhance this)
      const groupedHospitals = savedAppointments.reduce((acc, appt) => {
        const existing = acc[appt.hospital] || { name: appt.hospital, consultations: 0, earnings: 0, departments: ['General'] };
        existing.consultations += 1;
        existing.earnings += appt.fee || 0;
        acc[appt.hospital] = existing;
        return acc;
      }, {});

      setHospitals(Object.values(groupedHospitals));
      setLoading(false);
    };

    loadAppointmentsFromLocalStorage();
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" mb={2}>Doctor Dashboard</Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <EventNoteIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle1">Total Consultations</Typography>
                <Typography variant="h5">{overview.consultations}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <MonetizationOnIcon sx={{ fontSize: 40, mr: 2, color: 'success.main' }} />
              <Box>
                <Typography variant="subtitle1">Your Total Earnings (60% of Fee)</Typography>
                <Typography variant="h5">₹{overview.earnings}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Hospital-wise Earnings */}
      <Typography variant="h6" mt={2} mb={1}>Earnings by Hospital</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Hospital</TableCell>
              <TableCell>Department(s)</TableCell>
              <TableCell>Consultations</TableCell>
              <TableCell>Your Revenue (60%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.length > 0 ? (
              hospitals.map((hosp, index) => {
                const revenue = hosp.earnings * 0.6;
                return (
                  <TableRow key={index}>
                    <TableCell>{hosp.name}</TableCell>
                    <TableCell>
                      <List dense>
                        {hosp.departments?.map((dep) => (
                          <ListItem key={dep} disablePadding>{dep}</ListItem>
                        )) || 'General'}
                      </List>
                    </TableCell>
                    <TableCell>{hosp.consultations}</TableCell>
                    <TableCell>₹{revenue.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No hospital records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Upcoming Appointments */}
      <Typography variant="h6" mt={2} mb={1}>Upcoming Appointments</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <ScheduleIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                      {appt.date} {appt.time}
                    </Box>
                  </TableCell>
                  <TableCell>{appt.hospital}</TableCell>
                  <TableCell>{appt.patient || 'Anonymous'}</TableCell>
                  <TableCell>₹{appt.fee?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell>
                    <Chip
                      label={appt.status}
                      color={appt.status === 'Scheduled' ? 'primary' : 'success'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No appointments found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorDashboard;
