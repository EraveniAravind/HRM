// src/features/patient/SearchDoctor.jsx
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, MenuItem, Box, Grid,
  Paper, Button, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import axios from '../../api/axios';

const SearchDoctor = () => {
  const [specializations, setSpecializations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const patientId = "USER_ID_FROM_AUTH_OR_STATE";

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [specRes, hospRes] = await Promise.all([
          axios.get('/api/specializations'),
          axios.get('/api/hospitals')
        ]);
        setSpecializations(Array.isArray(specRes.data) ? specRes.data : []);
        setHospitals(Array.isArray(hospRes.data) ? hospRes.data : []);
      } catch (err) {
        setSpecializations([]);
        setHospitals([]);
        console.error('Failed loading filters', err);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    if (selectedSpec || selectedHospital) {
      setLoading(true);
      axios
        .get('/api/search/doctors', {
          params: {
            specialization: selectedSpec,
            hospital: selectedHospital
          }
        })
        .then((res) => {
          setDoctors(Array.isArray(res.data) ? res.data : []);
        })
        .catch((err) => {
          setDoctors([]);
          console.error('Search error', err);
        })
        .finally(() => setLoading(false));
    } else {
      setDoctors([]);
    }
  }, [selectedSpec, selectedHospital]);

  const handleViewAvailability = async (doctorId) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/doctors/${doctorId}/availability`);
      setAvailability(Array.isArray(res.data) ? res.data : []);
      setSelectedDoctor(doctors.find((doc) => doc.id === doctorId));
      setDialogOpen(true);
    } catch (err) {
      setAvailability([]);
      console.error('Availability error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    try {
      const payload = {
        patientId,
        doctorId: selectedDoctor.id,
        hospitalId: selectedDoctor.hospitalId,
        slot: selectedSlot,
        fee: selectedDoctor.consultationFee
      };
      await axios.post('/api/appointments', payload);
      alert('Appointment booked successfully!');
      setDialogOpen(false);
    } catch (err) {
      alert('Booking failed.');
      console.error(err);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Search for Doctors</Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          select label="Specialization" value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)} sx={{ minWidth: 200 }}>
          {Array.isArray(specializations) && specializations.length ? (
            specializations.map((spec) => (
              <MenuItem key={spec} value={spec}>{spec}</MenuItem>
            ))
          ) : (
            <MenuItem disabled>No specializations</MenuItem>
          )}
        </TextField>

        <TextField
          select label="Hospital" value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)} sx={{ minWidth: 200 }}>
          {Array.isArray(hospitals) && hospitals.length ? (
            hospitals.map((hosp) => (
              <MenuItem key={hosp.id || hosp.name} value={hosp.name}>{hosp.name}</MenuItem>
            ))
          ) : (
            <MenuItem disabled>No hospitals</MenuItem>
          )}
        </TextField>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {Array.isArray(doctors) && doctors.length === 0 && (
            <Typography variant="body2" sx={{ px: 2 }}>No doctors found.</Typography>
          )}
          {Array.isArray(doctors) && doctors.map((doc) => (
            <Grid item xs={12} md={6} key={doc.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{doc.name}</Typography>
                <Typography variant="body2">Specializations: {Array.isArray(doc.specializations) ? doc.specializations.join(', ') : doc.specializations}</Typography>
                <Typography variant="body2">Experience: {doc.experience} years</Typography>
                <Typography variant="body2">Hospital: {doc.hospital}</Typography>
                <Typography variant="body2">Consultation Fee: ₹{doc.consultationFee}</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleViewAvailability(doc.id)}>
                  View Availability
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Book Appointment with {selectedDoctor?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>Select an available slot:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Array.isArray(availability) && availability.length ? availability.map((slot, idx) => (
              <Button key={idx} variant={selectedSlot === slot ? 'contained' : 'outlined'}
                onClick={() => setSelectedSlot(slot)}>
                {slot}
              </Button>
            )) : <Typography>No slots found.</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button disabled={!selectedSlot} onClick={handleBookAppointment} variant="contained">Confirm Booking</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SearchDoctor;
