import CloseIcon from '@mui/icons-material/Close'
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
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useMemberInCommunity } from '../hooks/useMember'

import { Member } from '../types'
import SocialLinks from './SocialLinks'

const Timezone = ({
  country,
  city,
  timezone,
  direction,
}: {
  country: string
  city?: string
  timezone: string
  direction: any
}) => {
  return (
    <Box display="flex" alignItems={direction === 'row' ? 'center' : 'flex-start'} flexDirection={direction}>
      <Chip label={`${city}, ${country}`} sx={direction === 'row' ? { mr: 1 } : { mb: 1 }} />
      <span>{timezone}</span>
    </Box>
  )
}

export default function MemberCard({ member }: { member: Member }) {
  const router = useRouter()
  const { id } = router.query
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { data: session } = useSession()
  const { data: me } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  )

  const toggleDialog = () => setDialogOpen(!dialogOpen)

  const handleEditProfile = () => {
    router.push(`/community/${id}/member-edit`)
  }

   
  return (
    <>
      <Card
        sx={{
          width: '232px',
          boxShadow: '2px 8px 8px 0px rgba(245, 255, 244, 0.15)',
          '&:hover': {
            cursor: 'pointer',
            boxShadow: 'inset 4px 10px 35px 0px rgba(245, 255, 244, 0.2), 2px 8px 8px 0px rgba(245, 255, 244, 0.15)',
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" alignItems="flex-end">
            <Image
              src={member.logoUrl ?? '/images/Profile.svg'}
              alt={member.username}
              width={64}
              height={64}
              style={{ borderRadius: '100%' }}
            />
            <SocialLinks socialLinks={member.socialLinks} _size={20}/>
          </Box>
          <Typography fontWeight={600}>{member.username}</Typography>
          <Typography variant="caption">{member.discordHandle}</Typography>
          <Timezone country={member.country} city={member.city} timezone={member.timezone} direction="column" />
        </CardContent>
        <CardActions disableSpacing>
          <Button size="small" variant="contained" color="secondary" sx={{ marginLeft: 'auto' }} onClick={toggleDialog}>
            View
          </Button>
        </CardActions>
      </Card>
      <Dialog fullWidth maxWidth="xs" open={dialogOpen} onClose={toggleDialog}>
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
        <DialogContent sx={{ m: 2, p: '20px !important' }}>
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
            <Timezone country={member.country} city={member.city} timezone={member.timezone} direction="row" />
          </Box>
          <Box my={1} px={2}>
            <SocialLinks socialLinks={member.socialLinks} _size={20} />
          </Box>
          <Card sx={{ boxShadow: '0px 0px 25px 0px rgb(245 255 244 / 20%);' }}>
            <CardContent>
              <Box mt={2}>
                <Typography variant="body2" fontWeight={600} gutterBottom color="#CDFCB1">
                  About Me
                </Typography>
                <Typography variant="body2">{member.bio}</Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" fontWeight={600} gutterBottom color="#CDFCB1">
                  I&apos;m a ...
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
              <Box mt={1}>
                <Typography variant="body2" fontWeight={600} gutterBottom color="#CDFCB1">
                  Status
                </Typography>
                <Typography variant="body2">
                  {member.status === 0 ? 'Open to new projects' : 'Not open to new projects'}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" fontWeight={600} gutterBottom color="#CDFCB1">
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
              <Box mt={2}>
                <Typography variant="body2" fontWeight={600} gutterBottom color="#CDFCB1">
                  How I want to contribute
                </Typography>
                <Typography variant="body2">{member.contribution}</Typography>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}
