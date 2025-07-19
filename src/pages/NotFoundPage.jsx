// src/pages/NotFoundPage.jsx

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        textAlign="center"
        py={10}
        px={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant="h3" mt={2} mb={1}>
          404 – Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
