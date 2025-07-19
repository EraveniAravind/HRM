import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../components/common/InputField';

const schema = yup.object().shape({
  name: yup.string().required(),
  gender: yup.string().required(),
  dob: yup.date().required(),
  uniqueId: yup.string().required(),
});

const PatientRegister = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Patient Registered →', data);
    // Call backend API
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Patient Registration
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <InputField name="gender" control={control} label="Gender" />
        <InputField name="dob" control={control} label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} />
        <InputField name="uniqueId" control={control} label="Aadhar/Passport ID" />
        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default PatientRegister;
