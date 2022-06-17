import { Box, Button, Chip, IconButton, Typography, Tabs, Tab } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import SocialLinks from 'components/common/SocialLinks'
import TabPanel from 'components/common/TabPanel'
import BackIcon from 'components/icons/BackIcon'
import MemberLocationIcon from 'components/icons/MemberLocationIcon'
import VerifiedIcon from 'components/icons/VerifiedIcon'
import { useMemberInCommunity } from 'hooks/useMember'
import { shortenAddress, shortenExpertise, formattedDate } from 'utils'
import { Member } from 'types'

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
          padding: '0px 4px',
        }}
      />
      <Typography sx={{ color: '#E5ECE3', fontSize: '12px', fontWeight: 300 }}>{timezone}</Typography>
    </Box>
  )
}

const MemberCardChip = styled(Chip)`
  background: linear-gradient(98.65deg, #444cff -61.91%, #a93edc 124.86%), linear-gradient(0deg, #dbadf8, #dbadf8),
    linear-gradient(0deg, #27282b 21.49%, #686868 176.93%);
  border-radius: 4px;
  padding: 5px 16px;
  font-size: 12px;
  margin-right: 4px;
  font-family: 'Aeonik';
  font-weight: 400;
`

const MemberLocation = ({ city, country }: { city: string | undefined; country: string | undefined }) => (
  <Box sx={{ display: 'flex' }}>
    <Box>
      <MemberLocationIcon />
    </Box>
    <Box>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          color: '#FFFFFF',
          opacity: 0.6,
          marginTop: '-3px',
          marginLeft: '-6px',
        }}
      >
        {`${city} ${city ? ',' : ''}  ${country}`}
      </Typography>
    </Box>
  </Box>
)

const ConnectButton = styled(Button)`
  background: linear-gradient(98.65deg, #444cff -61.91%, #a93edc 124.86%), linear-gradient(0deg, #dbadf8, #dbadf8),
    linear-gradient(0deg, #27282b 21.49%, #686868 176.93%);
  border-radius: 4px;
  padding: 5px 16px;
  text-transform: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  &:hover {
    background: linear-gradient(98.65deg, #000588 -61.91%, #262b9d -61.89%, #6f01a4 124.86%),
      linear-gradient(0deg, #520084, #520084), linear-gradient(0deg, #27282b 21.49%, #686868 176.93%);
  }
`

const EditButton = styled(Button)`
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  padding: 10px 16px;
  text-transform: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #bbbbbb;
  &:hover {
    background: linear-gradient(98.65deg, #444cff -61.91%, #a93edc 124.86%), linear-gradient(0deg, #dbadf8, #dbadf8),
      linear-gradient(0deg, #27282b 21.49%, #686868 176.93%);
    color: #ffffff;
  }
`

const DUMMY_ADDRESS = '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B'

export default function MemberCard({ member }: { member: Member }) {
  const router = useRouter()
  const { id } = router.query
  const [dialogOpen, setDialogOpen] = useState(false)
  const [tabId, setTabId] = useState(0)
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
      <Box
        sx={{
          width: '340px',
          height: '196px',
          background: 'linear-gradient(150.32deg, #18181A 28.19%, #000000 105.48%)',
          border: me?._id === member._id ? '1.5px solid #A93EDC' : '1px solid #303236',
          borderRadius: '4px',
          p: '22px 20px',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={toggleDialog}
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" justifyContent="flex-start">
              <Box>
                <img
                  src={member.logoUrl ?? '/images/Profile.svg'}
                  alt={member.username}
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '100%',
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" sx={{ height: '100%' }}>
                <Box display="flex" alignItems="flex-start" sx={{ my: 'auto' }}>
                  <Box sx={{ mx: '8px' }}>
                    <Typography>{member.username}</Typography>
                  </Box>
                  <Box ml={0.5} my={0.5}>
                    <VerifiedIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  background: '#303236',
                  border: '1px solid #3D3F44',
                  borderRadius: '4px',
                  display: 'flex',
                  ml: 0.2,
                  mt: -1,
                  py: 0.2,
                  px: 0.2,
                }}
                onClick={() => console.log('copy address')}
              >
                <Typography color="text.secondary" sx={{ fontSize: '10px' }}>
                  {shortenAddress(member?.address || DUMMY_ADDRESS)}
                </Typography>
                <img
                  src={'/images/copyicon.svg'}
                  width={10}
                  height={10}
                  alt="Copy Address"
                  style={{ marginTop: '2px', marginLeft: '2px' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ minHeight: '30px' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '14px',
              color: '#FFFFFF',
              opacity: 0.6,
            }}
          >
            {`Expertise: ${shortenExpertise(member.expertise, member.extraExpertise)}`}
          </Typography>
        </Box>
        <Box mt={2}>
          {member.isContributor ? <MemberCardChip label="Web3 Creator Resident" /> : <MemberCardChip label="Member" />}
        </Box>
        <Box mt={3}>
          <MemberLocation city={member.city} country={member.country} />
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={toggleDialog}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={toggleDialog}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <Box display="flex" mt={-1}>
              <Box mt="8px">
                <BackIcon />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Go Back</Typography>
              </Box>
            </Box>
          </IconButton>
        </DialogTitle>
        <Box display="flex" flexDirection="column" sx={{ background: '#1F2023' }}>
          <Box
            display="flex"
            sx={{
              width: '100%',
              minHeight: '168px',
              background: `center/cover no-repeat url('/images/MemberBanner.png')`,
            }}
          />
          <Box display="flex" justifyContent="space-between" sx={{ mx: '10%' }}>
            <Box display="flex">
              <Box sx={{ mt: -3.7 }}>
                <img
                  src={member.logoUrl ?? '/images/Profile.svg'}
                  alt={member.username}
                  width={91.4}
                  height={91.4}
                  style={{
                    borderRadius: '100%',
                    border: '2.05373px solid #606ACB',
                  }}
                />
              </Box>
              <Box ml={3}>
                <Box display="flex">
                  <Typography sx={{ fontSize: '25.47px', fontWeight: 700, pt: 1 }}>{member.username}</Typography>
                  <Box
                    sx={{
                      background: '#303236',
                      border: '1.10862px solid rgba(214, 207, 207, 0.6)',
                      borderRadius: '3.18px',
                      display: 'flex',
                      flexDirection: 'row',
                      ml: 2,
                      mt: 1,
                      p: '5px 12.7369px',
                      cursor: 'pointer',
                    }}
                    onClick={() => console.log('handle copy')}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          opacity: 0.6,
                        }}
                      >
                        {shortenAddress(member?.address || DUMMY_ADDRESS)}
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '6px', marginTop: '-3px' }}>
                      <img src={'/images/copyicon.svg'} width={12} height={12} alt="Copy" />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <MemberLocation city={member.city} country={member.country} />
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  {member.isContributor ? (
                    <MemberCardChip label="Web3 Creator Resident" />
                  ) : (
                    <MemberCardChip label="Member" />
                  )}
                </Box>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mt={-1.9}>
                <Box>
                  <SocialLinks socialLinks={member.socialLinks} size={20} type="circle" />
                </Box>
                <Box sx={{ textAlign: 'center', mt: '4px' }}>
                  <Typography color="text.secondary" sx={{ fontSize: '10.0528px' }}>
                    {`Joined ${formattedDate(member.createdAt)}`}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  {me?._id === member._id ? (
                    <EditButton onClick={() => handleEditProfile()}>Edit Profile</EditButton>
                  ) : (
                    <ConnectButton>Interested in collab</ConnectButton>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' },
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              mx: '10%',
              mt: 5,
            }}
          >
            <Box sx={{ flex: 1, mb: 4 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
                <Tabs
                  value={tabId}
                  onChange={(e, newId) => setTabId(newId)}
                  TabIndicatorProps={{ style: { background: '#606ACB' } }}
                >
                  <Tab label="About" />
                  <Tab label="Projects" />
                  <Tab label="Contribution" />
                </Tabs>
              </Box>
              <TabPanel value={tabId} index={0}>
                <Box>
                  <Box mt={2}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        fontWeight: 500,
                      }}
                    >
                      About Me
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#8A8F98',
                      }}
                    >
                      {member.bio}
                    </Typography>
                  </Box>

                  <Box mt={3}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        fontWeight: 500,
                      }}
                    >
                      Expertise
                    </Typography>
                    <Box display="flex" alignItems="center" flexWrap="wrap" mt={1}>
                      {member.expertise.map((exp, i) => (
                        <Chip
                          key={i}
                          label={exp}
                          sx={{
                            background: 'linear-gradient(158.2deg, #27282B 30.29%, #686868 124.6%), #D6CFCF;',
                            border: '1px solid #303236',
                            borderRadius: '2.87px',
                            p: '7.18px 11.49px',
                            m: '8px 8px 8px 0px',
                            fontSize: '10.0528px',
                            fontWeight: 400,
                          }}
                        />
                      ))}
                      {member.extraExpertise.map((exp, i) => (
                        <Chip
                          key={i}
                          label={exp}
                          sx={{
                            background: 'linear-gradient(158.2deg, #27282B 30.29%, #686868 124.6%), #D6CFCF;',
                            border: '1px solid #303236',
                            borderRadius: '2.87px',
                            p: '7.18px 11.49px',
                            m: '8px 8px 8px 0px',
                            fontSize: '10.0528px',
                            fontWeight: 400,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        fontWeight: 500,
                      }}
                    >
                      How I want to contribute
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#8A8F98',
                      }}
                    >
                      {member.contribution}
                    </Typography>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={tabId} index={1}>
                Projects
              </TabPanel>
              <TabPanel value={tabId} index={2}>
                Contribution
              </TabPanel>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', mx: 'auto', my: 'auto' }}>
                <Box>
                  <Typography>Member Data</Typography>
                </Box>
                <Box sx={{ ml: 2 }}>
                  <MemberCardChip label="Coming Soon" />
                </Box>
              </Box>
              <Box></Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
