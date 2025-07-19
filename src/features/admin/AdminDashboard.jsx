import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import axios from '../../api/axios'; // Only needed if using real API

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctorRevenue, setTotalDoctorRevenue] = useState(0); // full revenue from doctors
  const [totalHospitalRevenue, setTotalHospitalRevenue] = useState(0);
  const [totalConsultations, setTotalConsultations] = useState(0);

  useEffect(() => {
    const simulateFetch = async () => {
      try {
        // 🧪 Mock data — each doctor has total fee charged
        const mockDoctorData = [
          {
            id: 'doc1',
            name: 'Dr. Raj Sharma',
            department: 'Cardiology',
            consultations: 30,
            revenue: 45000, // full revenue from appointments across hospital
          },
          {
            id: 'doc2',
            name: 'Dr. Neha Kapoor',
            department: 'Pediatrics',
            consultations: 22,
            revenue: 33000,
          },
        ];

        setDoctors(mockDoctorData);

        // Totals
        const totalConsults = mockDoctorData.reduce((sum, d) => sum + d.consultations, 0);
        const fullDoctorRevenue = mockDoctorData.reduce((sum, d) => sum + d.revenue, 0);
        const hospitalShare = fullDoctorRevenue * 0.4; // 💰 Hospital earns 40%

        setTotalConsultations(totalConsults);
        setTotalDoctorRevenue(fullDoctorRevenue);
        setTotalHospitalRevenue(hospitalShare);
      } catch (err) {
        console.error('Error fetching doctors data:', err);
        setDoctors([]);
        setTotalDoctorRevenue(0);
        setTotalHospitalRevenue(0);
        setTotalConsultations(0);
      }
    };

    simulateFetch();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Hospital Admin Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <GroupIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle1">Total Doctors</Typography>
                <Typography variant="h5">{doctors.length}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <AssignmentIcon sx={{ fontSize: 40, mr: 2, color: 'secondary.main' }} />
              <Box>
                <Typography variant="subtitle1">Total Consultations</Typography>
                <Typography variant="h5">{totalConsultations}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <MonetizationOnIcon sx={{ fontSize: 40, mr: 2, color: 'success.main' }} />
              <Box>
                <Typography variant="subtitle1">Hospital Revenue (40%)</Typography>
                <Typography variant="h5">₹{totalHospitalRevenue.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Doctors Table */}
      <Typography variant="h6" gutterBottom>
        Doctors Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Consultations</TableCell>
              <TableCell>Total Fees</TableCell>
              <TableCell>Hospital Share (40%)</TableCell>
              <TableCell>Doctor Share (60%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(doctors) && doctors.length > 0 ? (
              doctors.map((doc) => {
                const doctorShare = doc.revenue * 0.6;
                const hospitalShare = doc.revenue * 0.4;

                return (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.department}</TableCell>
                    <TableCell>{doc.consultations}</TableCell>
                    <TableCell>₹{doc.revenue}</TableCell>
                    <TableCell>₹{hospitalShare.toFixed(2)}</TableCell>
                    <TableCell>₹{doctorShare.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;
