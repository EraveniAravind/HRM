// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   MenuItem,
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Paper,
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const roles = [
//   { label: 'Hospital Admin', value: 'admin' },
//   { label: 'Doctor', value: 'doctor' },
//   { label: 'Patient', value: 'patient' },
// ];

// // 🎯 Yup Schemas for Roles

// const baseSchema = {
//   name: yup.string().required('Full name is required'),
//   email: yup.string().email().required(),
//   password: yup.string().min(4).required('Password is required'),
// };

// const schemas = {
//   admin: yup.object().shape({
//     ...baseSchema,
//     hospitalName: yup.string().required(),
//     location: yup.string().required(),
//   }),
//   doctor: yup.object().shape({
//     ...baseSchema,
//     specializations: yup.string().required(),
//     experience: yup.number().min(0).required(),
//   }),
//   patient: yup.object().shape({
//     ...baseSchema,
//     gender: yup.string().required(),
//     dob: yup.date().required(),
//     uniqueId: yup.string().required('Aadhar / Passport required'),
//   }),
// };

// const RegisterPage = () => {
//   const [selectedRole, setSelectedRole] = useState('admin');

//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schemas[selectedRole]),
//   });

//   const onSubmit = (data) => {
//     console.log(`📝 Register ${selectedRole}:`, data);
//     alert(`Registered as ${selectedRole}. Check console for payload.`);
//     reset();
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom textAlign="center">
//           Register as {selectedRole === 'admin' ? 'Hospital Admin' : selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
//         </Typography>

//         <Box mb={3}>
//           <TextField
//             select
//             fullWidth
//             label="Select Role"
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//           >
//             {roles.map((role) => (
//               <MenuItem key={role.value} value={role.value}>
//                 {role.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>

//         <form noValidate onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="name"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Full Name"
//                     error={!!errors.name}
//                     helperText={errors.name?.message}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Email"
//                     error={!!errors.email}
//                     helperText={errors.email?.message}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="password"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     type="password"
//                     label="Password"
//                     error={!!errors.password}
//                     helperText={errors.password?.message}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* Role-Specific Fields */}
//             {selectedRole === 'admin' && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <Controller
//                     name="hospitalName"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         fullWidth
//                         label="Hospital Name"
//                         error={!!errors.hospitalName}
//                         helperText={errors.hospitalName?.message}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Controller
//                     name="location"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         fullWidth
//                         label="Hospital Location"
//                         error={!!errors.location}
//                         helperText={errors.location?.message}
//                       />
//                     )}
//                   />
//                 </Grid>
//               </>
//             )}

//             {selectedRole === 'doctor' && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <Controller
//                     name="specializations"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         fullWidth
//                         label="Specializations (comma separated)"
//                         error={!!errors.specializations}
//                         helperText={errors.specializations?.message}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Controller
//                     name="experience"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         fullWidth
//                         type="number"
//                         label="Years of Experience"
//                         error={!!errors.experience}
//                         helperText={errors.experience?.message}
//                       />
//                     )}
//                   />
//                 </Grid>
//               </>
//             )}

//             {selectedRole === 'patient' && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <Controller
//                     name="gender"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         fullWidth
//                         select
//                         label="Gender"
//                         error={!!errors.gender}
//                         helperText={errors.gender?.message}
//                       >
//                         <MenuItem value="Male">Male</MenuItem>
//                         <MenuItem value="Female">Female</MenuItem>
//                         <MenuItem value="Other">Other</MenuItem>
//                       </TextField>
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Controller
//                     name="dob"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         fullWidth
//                         type="date"
//                         label="Date of Birth"
//                         InputLabelProps={{ shrink: true }}
//                         error={!!errors.dob}
//                         helperText={errors.dob?.message}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Controller
//                     name="uniqueId"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         fullWidth
//                         label="Aadhar / Passport ID"
//                         error={!!errors.uniqueId}
//                         helperText={errors.uniqueId?.message}
//                       />
//                     )}
//                   />
//                 </Grid>
//               </>
//             )}

//             {/* Submit Button */}
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary" fullWidth size="large">
//                 Register
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default RegisterPage;
import React, { useState } from 'react';
import {
  Container,
  Typography,
  MenuItem,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const roles = [
  { label: 'Hospital Admin', value: 'admin' },
  { label: 'Doctor', value: 'doctor' },
  { label: 'Patient', value: 'patient' },
];

// Base validation schema
const baseSchema = {
  name: yup.string().required('Full name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(4).required('Password is required'),
};

const schemas = {
  admin: yup.object().shape({
    ...baseSchema,
    hospitalName: yup.string().required('Hospital name is required'),
    location: yup.string().required('Location is required'),
  }),
  doctor: yup.object().shape({
    ...baseSchema,
    specializations: yup.string().required('Specializations required'),
    experience: yup.number().min(0).required('Experience required'),
  }),
  patient: yup.object().shape({
    ...baseSchema,
    gender: yup.string().required('Gender is required'),
    dob: yup.date().required('Date of birth is required'),
    uniqueId: yup.string().required('Aadhar / Passport ID required'),
  }),
};

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState('admin');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas[selectedRole]),
  });

  const onSubmit = (data) => {
    console.log(`📝 Register ${selectedRole}:`, data);
    alert(`Registered as ${selectedRole}. Check console for payload.`);
    reset();
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Register as {selectedRole === 'admin' ? 'Hospital Admin' : selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
        </Typography>

        <Box mb={3}>
          <TextField
            select
            fullWidth
            label="Select Role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    fullWidth
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>

            {/* Admin-specific fields */}
            {selectedRole === 'admin' && (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="hospitalName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Hospital Name"
                        fullWidth
                        error={!!errors.hospitalName}
                        helperText={errors.hospitalName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Hospital Location"
                        fullWidth
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Doctor-specific */}
            {selectedRole === 'doctor' && (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="specializations"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Specializations (comma separated)"
                        fullWidth
                        error={!!errors.specializations}
                        helperText={errors.specializations?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Years of Experience"
                        fullWidth
                        error={!!errors.experience}
                        helperText={errors.experience?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Patient-specific */}
            {selectedRole === 'patient' && (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Gender"
                        fullWidth
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Date of Birth"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.dob}
                        helperText={errors.dob?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name="uniqueId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Aadhar / Passport ID"
                        fullWidth
                        error={!!errors.uniqueId}
                        helperText={errors.uniqueId?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Submit */}
            <Grid size={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
