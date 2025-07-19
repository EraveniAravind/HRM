import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const InputField = ({ name, control, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default InputField;
