import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress, Divider, Chip, List, ListItem,
  TextField, Button, MenuItem
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useSelector } from 'react-redux';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);

  // Booking UI states
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [specializations] = useState(['Cardiology', 'Neurology', 'Pediatrics']);
  const [hospitals] = useState(['City Clinic', 'Metro Hospital', 'Apollo', 'Fortis']);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [consultationFee, setConsultationFee] = useState('');

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const localAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const historyData = JSON.parse(localStorage.getItem('history')) || [];

        setAppointments(localAppointments);
        setHistory(historyData);

        const totalPaid = historyData.reduce((sum, h) => sum + (h?.fee || 0), 0);
        setTotalPaid(totalPaid);
      } catch (err) {
        setAppointments([]);
        setHistory([]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleConfirmBooking = () => {
    if (!consultationFee || Number(consultationFee) < 1) {
      alert('Please enter a valid consultation fee');
      return;
    }

    const newAppt = {
      id: Date.now(),
      date: '2025-07-25',
      time: availableSlots[0],
      doctor: selectedDoctor.name,
      hospital: selectedDoctor.hospital,
      status: 'Scheduled',
      patient: user?.name || 'You',
      fee: Number(consultationFee),
    };

    const updatedAppointments = [...appointments, newAppt];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setBookingSuccess(true);
    setSelectedDoctor(null);
    setAvailableSlots([]);
    setConsultationFee('');
  }

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" mb={2}>Patient Dashboard</Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <ScheduleIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle1">Upcoming Appointments</Typography>
                <Typography variant="h5">{appointments.length}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <MonetizationOnIcon sx={{ fontSize: 40, mr: 2, color: 'success.main' }} />
              <Box>
                <Typography variant="subtitle1">Total Paid</Typography>
                <Typography variant="h5">₹{totalPaid}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Booking Form */}
      <Typography variant="h6" mt={4} mb={2}>Book New Appointment</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            select fullWidth label="Select Hospital"
            value={selectedHospital}
            onChange={(e) => {
              setSelectedHospital(e.target.value);
              setAvailableDoctors([]);
              setSelectedDoctor(null);
              setAvailableSlots([]);
            }}
          >
            {hospitals.map((hosp) => (
              <MenuItem key={hosp} value={hosp}>{hosp}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            select fullWidth label="Specialization"
            value={selectedSpecialization}
            onChange={(e) => {
              setSelectedSpecialization(e.target.value);
              setAvailableDoctors([]);
              setSelectedDoctor(null);
              setAvailableSlots([]);
            }}
          >
            {specializations.map((spec) => (
              <MenuItem key={spec} value={spec}>{spec}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth variant="contained"
            onClick={() => {
              const mockDoctors = [
                {
                  id: 1,
                  name: 'Dr. Deshmukh',
                  hospital: selectedHospital,
                  specialization: selectedSpecialization,
                  slots: ['10:00 AM', '11:00 AM', '2:00 PM'],
                },
                {
                  id: 2,
                  name: 'Dr. Sen',
                  hospital: selectedHospital,
                  specialization: selectedSpecialization,
                  slots: ['9:30 AM', '12:00 PM', '3:00 PM'],
                },
              ];
              setAvailableDoctors(mockDoctors);
            }}
          >Search Doctors</Button>
        </Grid>
      </Grid>

      {/* Doctor List With Booking */}
      {availableDoctors.length > 0 && (
        <>
          <Typography variant="subtitle1" mt={3}>Doctors Found:</Typography>
          <Grid container spacing={2} mt={1}>
            {availableDoctors.map((doc) => (
              <Grid item xs={12} md={6} key={doc.id}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1">{doc.name}</Typography>
                  <Typography variant="body2">{doc.specialization}</Typography>
                  <Typography variant="body2">{doc.hospital}</Typography>
                  <TextField
                    type="number"
                    label="Consultation Fee"
                    value={consultationFee}
                    onChange={(e) => setConsultationFee(e.target.value)}
                    fullWidth sx={{ mt: 2 }} />
                  <Box mt={1}>
                    {doc.slots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedDoctor?.id === doc.id && availableSlots.includes(slot) ? 'contained' : 'outlined'}
                        sx={{ mr: 1, mb: 1 }}
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setAvailableSlots([slot]);
                          setBookingSuccess(false);
                        }}
                      >
                        {slot}
                      </Button>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {selectedDoctor && availableSlots.length > 0 && (
            <Box mt={2}>
              <Button variant="contained" onClick={handleConfirmBooking} color="success">
                Confirm Booking with {selectedDoctor.name} at {availableSlots[0]}
              </Button>
              {bookingSuccess && (
                <Typography color="green" mt={1}>
                  ✅ Appointment booked successfully!
                </Typography>
              )}
            </Box>
          )}
        </>
      )}

      {/* Upcoming Appointments */}
      <Typography variant="h6" mt={5} mb={1}>Upcoming Appointments</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date &amp; Time</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Fee Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.date} {appt.time}</TableCell>
                  <TableCell>{appt.doctor}</TableCell>
                  <TableCell>{appt.hospital}</TableCell>
                  <TableCell><Chip label={appt.status} color="primary" size="small" /></TableCell>
                  <TableCell>₹{appt.fee}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No upcoming appointments.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* History */}
      <Typography variant="h6" mt={5} mb={1}>Consultation History</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Departments</TableCell>
              <TableCell>Fee Paid</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length > 0 ? (
              history.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>{rec.date}</TableCell>
                  <TableCell>{rec.doctor}</TableCell>
                  <TableCell>{rec.hospital}</TableCell>
                  <TableCell>
                    <List dense>
                      {(rec.departments || []).map((dep) => (
                        <ListItem key={dep} disablePadding>{dep}</ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>₹{rec.fee}</TableCell>
                  <TableCell><Chip label={rec.status} size="small" color="success" /></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No consultation history available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PatientDashboard;
