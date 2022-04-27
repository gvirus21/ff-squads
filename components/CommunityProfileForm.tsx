import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFile from '@mui/icons-material/UploadFile';
import React from 'react';

import { SOCIALS } from '../config/constants';

import MultipleSelect from './MultipleSelect';

const Input = styled('input')({
  display: 'none',
});

const LogoUpload = () => {
  return (
    <Box sx={{ position: 'relative' }} mb={5}>
      <Box sx={{ width: '100%', height: '96px', background: `url('/images/back.jpg')`, borderRadius: '6px' }} />
      <label
        htmlFor="logo-upload-button"
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
          background: '#e2e8f0',
          borderRadius: '100%',
        }}
      >
        <Input id="logo-upload-button" accept="image/*" type="file" />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          sx={{ width: '80px', height: '80px', background: '#e2e8f0', border: '4px solid #fafafa' }}
        >
          <UploadFile />
        </IconButton>
      </label>
    </Box>
  );
};

export default function CommunityProfileForm() {
  return (
    <>
      <Box>
        <LogoUpload />
      </Box>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          Community name
        </Typography>
        <TextField variant="outlined" fullWidth />
      </Box>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          Tell us about your community
        </Typography>
        <TextField variant="outlined" multiline rows={3} fullWidth />
      </Box>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          Where can we find your community online?
        </Typography>
        <MultipleSelect data={SOCIALS} />
      </Box>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          Social link or handle
        </Typography>
        <TextField variant="outlined" fullWidth />
      </Box>
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" gutterBottom>
              Network
            </Typography>
            <TextField variant="outlined" disabled fullWidth value="Ethereum" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" gutterBottom>
              Token Symbol
            </Typography>
            <TextField variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </Box>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          Token contract address
        </Typography>
        <TextField variant="outlined" fullWidth />
      </Box>
      <Button variant="contained" size="large">
        Save
      </Button>
    </>
  );
}
