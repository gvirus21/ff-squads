import CloseIcon from '@mui/icons-material/Close';
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
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useMemberInCommunity } from '../hooks/useMember';

import { Member } from '../types';
import SocialLinks from './SocialLinks';

const Timezone = ({ country, city, timezone }: { country: string; city?: string; timezone: string }) => {
  return (
    <Box display="flex" alignItems="center">
      <Chip label={`${city}, ${country}`} sx={{ mr: 1 }} />
      <span>{timezone}</span>
    </Box>
  );
};

export default function MemberCard({ member }: { member: Member }) {
  const router = useRouter();
  const { id } = router.query;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { data: session } = useSession();
  const { data: me } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  );

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const handleEditProfile = () => {
    router.push(`/community/${id}/member/edit`);
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Image
              src={member.logoUrl ?? '/images/Profile.svg'}
              alt={member.username}
              width={64}
              height={64}
              style={{ borderRadius: '100%' }}
            />
          }
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
      <Dialog fullWidth maxWidth="md" open={dialogOpen} onClose={toggleDialog}>
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
        <DialogContent sx={{ m: 2, p: '20px !important', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" px={2}>
              <Image
                src={member.logoUrl ?? '/images/Profile.svg'}
                alt={member.username}
                width={64}
                height={64}
                style={{ borderRadius: '100%' }}
              />
              <Box ml={2}>
                <Typography variant="h5" gutterBottom>
                  {member.username}
                </Typography>
                <Typography variant="body1">{member.discordHandle}</Typography>
              </Box>
            </Box>
            {me?._id === member._id ? (
              <Box>
                <Button color="secondary" variant="contained" onClick={handleEditProfile}>
                  EDIT
                </Button>
              </Box>
            ) : (
              <></>
            )}
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
            <Typography variant="body2">{member.bio}</Typography>
          </Box>
          <Box mt={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              I'm a ...
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              {member.expertise.map((exp, i) => (
                <Chip key={i} label={exp} sx={{ mr: 1, mb: 1 }} />
              ))}
              {member.extraExpertise.map((exp, i) => (
                <Chip key={i} label={exp} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </Box>
          <Box mt={1} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Status
            </Typography>
            <Typography variant="body2">
              {member.status === 0 ? 'Open to new projects' : 'Not open to new projects'}
            </Typography>
          </Box>
          <Box mt={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Availability
            </Typography>
            <Typography variant="body2">
              {member.availability === 0
                ? 'Full-time (5-8 hrs)'
                : member.availability === 1
                ? 'Part-time (1-4 hrs)'
                : 'Volunteer'}
            </Typography>
          </Box>
          <Box mt={2} px={2}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              How I want to contribute
            </Typography>
            <Typography variant="body2">{member.contribution}</Typography>
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
