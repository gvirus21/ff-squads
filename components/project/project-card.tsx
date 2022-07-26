import { useState } from 'react'
import Image from 'next/image'
import { Box, Typography, Grid, Dialog, DialogTitle, IconButton, Avatar } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { styled } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import ReactPlayer from 'react-player'
import { Project } from '../../types'

const ReactModalVideo = styled(ReactPlayer)`
  margin-top: 50px;
`

const ReactThumbnailVideo = styled(ReactPlayer)``

function ProjectCard({ project }: { project: Project }) {
  const {
    creatorName,
    projectTitle,
    thumbnail,
    coverUrl,
    coverFileType,
    profileImageUrl,
    isFeatured,
    openToCollab,
    expertise,
    about,
  } = project

  const [dialogOpen, setDialogOpen] = useState(false)
  const toggleDialog = () => setDialogOpen(!dialogOpen)

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        onClick={toggleDialog}
        sx={{
          height: '370px',
          width: '332px',
          background: 'linear-gradient(150.32deg, #18181A 28.19%, #000000 105.48%)',
          borderRadius: '8px',
          mb: '21px',
          cursor: 'pointer',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
          <Box display="flex" justifyContent="center" marginTop="9px" sx={{ width: '100%' }}>
              <Box display="flex" alignItems="center">
                <Image
                  src={thumbnail}
                  alt={'Thumbnail-alt'}
                  width={300}
                  height={160}
                  style={{ background: '#252525e6', borderRadius: '6px' }}
                />
              </Box>
          </Box>

          <Box sx={{ width: '90%', mt: '16px' }}>
            <Typography sx={{ fontSize: '18px' }}>{projectTitle}</Typography>
            <Box display="flex" alignItems="center" sx={{ mt: '10px' }}>
              <Image
                src={profileImageUrl}
                alt={'Thumbnail-alt'}
                width={18}
                height={15}
                style={{ background: '#252525e6', borderRadius: '100px' }}
              />
              <Typography sx={{ fontSize: '12px', ml: '4px', color: '#969696' }}>{creatorName}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mx: '16px', mt: '16px', mb: '5px', width: '90%' }}>
          {openToCollab ? (
            <Box
              display="flex"
              alignItems="center"
              sx={{
                padding: '5px 16px',
                height: '30px',
                width: '140px',
                background: 'linear-gradient(88.41deg, #444CFF 0%, #A93EDC 100%);',
                borderRadius: '5px',
              }}
            >
              <DoneIcon sx={{ mr: '8px', fontSize: '10px' }} />
              <Typography fontSize="12px">Open to Collab</Typography>
            </Box>
          ) : (
            <Box />
          )}

          <Grid container sx={{ mt: '8px' }}>
            {expertise.map((value: string, index: number) => {
              return (
                <Grid
                  key={index}
                  item
                  sx={{
                    background: 'linear-gradient(0deg, #27282B 21.49%, #686868 176.93%)',
                    px: '16px',
                    py: '5px',
                    mb: '5px',
                    mr: '10px',
                    borderRadius: '4px',
                  }}
                >
                  <Typography fontSize="12px">{value}</Typography>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>

      <Dialog
        fullWidth
        maxWidth="lg"
        BackdropProps={{
          style: {
            background: '#25252585',
          },
        }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
          },
        }}
        open={dialogOpen}
        onClose={toggleDialog}
        sx={{
          zIndex: 999999,
          height: '1000px',
          width: '1100px',
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* graient circle */}
        <Box
          sx={{
            borderRadius: '1000px',
            height: '415px',
            width: '415px',
            background: 'rgba(125, 73, 234, 0.21)',
            opacity: '90%',
            filter: 'blur(50px)',
            position: 'absolute',
            top: '-70px',
            left: '-90px',
            zIndex: 999,
            overflow: 'hidden',
          }}
        />

        <Box
          sx={{
            background: '#1F2023',
            height: '876px',
            width: '1034px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '823px',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alighItems: 'center',
              }}
            >
              {/* Cover banner */}
              {coverFileType === 'image' && (
                <Box style={{ marginTop: '50px' }}>
                  <Image
                    src={coverUrl}
                    height="450px"
                    width={'823px'}
                    style={{
                      borderRadius: '6px',
                      marginTop: '50px',
                    }}
                    alt="cover"
                  />
                </Box>
              )}
              {coverFileType === 'video' && (
                <ReactModalVideo
                  url={coverUrl}
                  height="450px"
                  width="823px"
                  muted={false}
                  playing
                  controls
                  style={{ borderRadius: '6px' }}
                />
              )}

              <Box
                sx={{
                  zIndex: 999,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  mt: '60px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '23px',
                    fontWeight: '700',
                    lineHeight: '27.5px',
                    letterSpacing: '1px',
                  }}
                >
                  {projectTitle}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    mt: '15px',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={profileImageUrl} height={20} width={20} alt="profile-img" />
                    <Typography sx={{ mx: '5px', fontSize: '14px' }}>{creatorName}</Typography>
                  </Box>
                  {openToCollab && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 16px',
                        borderRadius: '4px',
                        background:
                          'linear-gradient(98.65deg, #444CFF -61.91%, #A93EDC 124.86%), linear-gradient(0deg, #DBADF8, #DBADF8), linear-gradient(0deg, #27282B 21.49%, #686868 176.93%)',
                      }}
                    >
                      {' '}
                      <Typography sx={{ fontSize: '16px' }}>Intrested in collab</Typography>{' '}
                    </Box>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ width: '70%' }}>
                  <Box sx={{ display: 'flex', marginTop: '10px' }}>
                    {expertise.map((exp: string, index: number) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            border: 1,
                            borderColor: '#903ed8',
                            padding: '10px 15px',
                            marginRight: '10px',
                            borderRadius: '4px',
                          }}
                        >
                          <Typography sx={{ fontSize: '12px' }}>{exp}</Typography>
                        </Box>
                      )
                    })}
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: '25px',
                      flexDirection: 'column',
                      // mx: '15px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: '700',
                        fontSize: '18px',
                        lineHeight: '21px',
                      }}
                    >
                      About the project
                    </Typography>
                    <Typography sx={{ width: '460px', color: '#8A8F98', mt: '10px' }}>{about}</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ mt: '16px', ml: '-10px' }}>Interested Collaborators</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

export default ProjectCard
