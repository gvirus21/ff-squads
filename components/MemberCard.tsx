import CloseIcon from '@mui/icons-material/Close'
import { Box, Card, CardContent, Chip, IconButton, Button, Avatar, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useMemberInCommunity } from '../hooks/useMember'
import ExpertiseIcon from './icons/ExpertiseIcon'
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
      <Chip
        label={`${city}, ${country}`}
        sx={{
          backgroundColor: '#616D6C',
          color: '#E5ECE3',
          opacity: '.8',
          boxShadow: '0px 3.17565px 3.17565px rgba(0, 0, 0, 0.25)',
          fontSize: '12px',
          fontWeight: 300,
          backdropFilter: 'blur(3.17565px)',
          mr: direction === 'row' ? 1 : 0,
          mb: direction === 'row' ? 0 : 1,
        }}
      />
      <Typography  sx={{color:"#E5ECE3", fontSize:'12px',fontWeight:300}}>
        {timezone}
      </Typography>
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
            border : '2px solid #8C79E2'
          },
        }}
        onClick={toggleDialog}
      >
        <CardContent sx={{ p: 2}}>
          <Box display="flex" >
            <Box>
              <Image
              src={member.logoUrl ?? '/images/Profile.svg'}
              alt={member.username}
              width={64}
              height={64}
              style={{ borderRadius: '100%' , border : '4.44444px solid #11151F' }}
              />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{width:'100%'}} >
              <Box display="flex" justifyContent="right">
                <ExpertiseIcon sx={{color:'#BAC3B9'}}  />
              </Box>
              <Box ml={3} pb={-4} mb={-1}>
                <SocialLinks socialLinks={member.socialLinks} _size={20} />
              </Box>
              
              
            </Box>
            
             
          </Box>
          <Typography fontWeight={600} sx={{ mt: 2 }}>
            {member.username}
          </Typography>
          <Typography component="p" variant="caption" color="#E5ECE3" sx={{ mb: 3.5 , fontWeight: 300 }}>
            {member.discordHandle}
          </Typography>
          <Timezone country={member.country} city={member.city} timezone={member.timezone} direction="column" />
        </CardContent>
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
          <Box display="flex" alignItems="baseline" justifyContent="space-between" position="relative">
            <Image
              src={member.logoUrl ?? '/images/Profile.svg'}
              alt={member.username}
              width={80}
              height={80}
              style={{ borderRadius: '100%' }}
            />
            <Box ml={3}>
              <SocialLinks socialLinks={member.socialLinks} _size={24} />
            </Box>
            {me?._id === member._id && (
              <Box position="absolute" sx={{ top: 0, right: 0 }}>
                <IconButton onClick={handleEditProfile}>
                  <Image src={'/images/CommunityEditIcon.svg'} width={20} height={20} alt="edit" />
                </IconButton>
              </Box>
            )}
          </Box>
          <Typography fontWeight={600} sx={{ mt: 2 }}>
            {member.username}
          </Typography>
          <Typography component="p" variant="caption" color="#E5ECE3" sx={{ mb: 3.5 }}>
            {member.discordHandle}
          </Typography>
          <Timezone country={member.country} city={member.city} timezone={member.timezone} direction="row" />
          <Card sx={{ mt: 3, boxShadow: '0px 0px 25px 0px rgb(245 255 244 / 20%);' }}>
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
                    <Chip key={i} label={exp} sx={{ mr: 1, mb: 1 }} color="primary" />
                  ))}
                  {member.extraExpertise.map((exp, i) => (
                    <Chip key={i} label={exp} sx={{ mr: 1, mb: 1 }} color="primary" />
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
