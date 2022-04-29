import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
  IconButton,
  Button,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import Image from 'next/image';

import SocialLinks from './SocialLinks';
import { Member } from '../types';

const Timezone = ({ country, city, timezone }: { country: string; city?: string; timezone: string }) => {
  return (
    <Box display="flex" alignItems="center">
      <Chip label={`${city}, ${country}`} sx={{ mr: 1 }} />
      <span>{timezone}</span>
    </Box>
  );
};

export default function MemberCard({ member }: { member: Member }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Image src="/images/member.png" width={64} height={64} style={{ borderRadius: '100%' }} />}
          title={member.username}
          titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
          subheader={member.discordHandle}
          subheaderTypographyProps={{ variant: 'body1', color: 'textPrimary' }}
        />
        <CardContent>
          <Timezone country={member.country} city={member.city} timezone={member.timezone} />
        </CardContent>
        <CardActions disableSpacing>
          <SocialLinks socialLinks={member.socialLinks} />
          <Button size="small" variant="contained" color="secondary" sx={{ marginLeft: 'auto' }} onClick={toggleDialog}>
            View
          </Button>
        </CardActions>
      </Card>
      <Dialog maxWidth="sm" open={dialogOpen} onClose={toggleDialog}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={toggleDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center" px={2}>
            <Image src="/images/member.png" width={64} height={64} style={{ borderRadius: '100%' }} />
            <Box ml={2}>
              <Typography variant="h5" gutterBottom>
                {member.username}
              </Typography>
              <Typography variant="body1">{member.discordHandle}</Typography>
            </Box>
          </Box>
          <Box mt={3} px={2}>
            <Timezone country={member.country} city={member.city} timezone={member.timezone} />
          </Box>
          <Box my={1} px={2}>
            <SocialLinks socialLinks={member.socialLinks} />
          </Box>
          <Divider />
          <Box mt={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              About Me
            </Typography>
            <Typography variant="body2">
              Hi, I'm Timi, a software engineer who loves building mobile and web applications that are scalable and
              efficient under the hood.
            </Typography>
          </Box>
          <Box mt={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              I'm a ...
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <Chip label="Frontend developer" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Web3 Expert / Strategist" sx={{ mr: 1, mb: 1 }} />
            </Box>
          </Box>
          <Box mt={1} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Status
            </Typography>
            <Typography variant="body2">Not open to new projects</Typography>
          </Box>
          <Box mt={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Availability
            </Typography>
            <Typography variant="body2">Part-time (1-4 hrs)</Typography>
          </Box>
          <Box mt={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              How I want to contribute
            </Typography>
            <Typography variant="body2">I would like to help build Web3 tools for aspiring creators!</Typography>
          </Box>
          <Box my={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Joined
            </Typography>
            <Chip label="30, Mar 2022" />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
