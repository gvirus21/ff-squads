import React, { useState } from 'react'
import { Box, Typography, CardMedia, Grid, Dialog, DialogTitle, IconButton } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'

import BackIcon from 'components/icons/BackIcon'
import { Project } from 'types'

function ProjectCard({ project }: { project: Project }) {
  const { username, projectTitle, coverUrl, coverFileType, profileImageUrl, openToCollab, expertise, about } = project

  const [dialogOpen, setDialogOpen] = React.useState(false)
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
            {coverFileType === 'image' && (
              <CardMedia
                component="img"
                src={coverUrl}
                style={{
                  height: '158px',
                  width: '313.11px',
                  borderRadius: '6px',
                }}
              />
            )}
            {coverFileType === 'video' && (
              <CardMedia
                component="video"
                src={coverUrl}
                autoPlay
                style={{
                  height: '160px',
                  borderRadius: '6px',
                }}
              />
            )}
          </Box>

          <Box sx={{ width: '90%', mt: '16px' }}>
            <Typography sx={{ fontSize: '18px' }}>{projectTitle}</Typography>
            <Box display="flex" alignItems="center" sx={{ mt: '10px' }}>
              <CardMedia
                component="img"
                src={profileImageUrl}
                style={{
                  height: '17.83px',
                  width: '17.83px',
                  borderRadius: '100px',
                }}
              />
              <Typography sx={{ fontSize: '12px', ml: '4px', color: '#969696' }}>{username}</Typography>
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
            {expertise.map((value) => {
              return (
                <Grid
                  item
                  sx={{
                    background: 'linear-gradient(0deg, #27282B 21.49%, #686868 176.93%)',
                    px: '16px',
                    py: '5px',
                    mb: '5px',
                    mr: '10px',
                    borderRadius: '4px',
                  }}
                  key={value}
                >
                  <Typography fontSize="12px">{value}</Typography>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>

      <Dialog
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
            height: '20vh',
            width: '20vw',
          },
        }}
        open={dialogOpen}
        onClose={toggleDialog}
        sx={{
          zIndex: 999999,
          height: '1000px',
          width: '1500px',
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
                <CardMedia
                  component="img"
                  src={coverUrl}
                  style={{
                    height: '450px',
                    borderRadius: '6px',
                    marginTop: '50px',
                  }}
                />
              )}
              {coverFileType === 'video' && (
                <CardMedia
                  component="video"
                  src={coverUrl}
                  autoPlay
                  style={{
                    height: '450px',
                    borderRadius: '6px',
                    marginTop: '50px',
                  }}
                />
              )}

              <Box
                sx={{
                  zIndex: 999,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  mt: '70px',
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

                {/* <Box sx={{}}>

								</Box> */}

                <Box
                  sx={{
                    display: 'flex',
                    mt: '10px',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia component="img" src={profileImageUrl} sx={{ width: '18px', height: '18px' }} />
                    <Typography sx={{ mx: '5px', fontSize: '14px' }}>{username}</Typography>
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
                    {expertise.map((exp: string) => (
                      <Box
                        sx={{
                          border: 1,
                          borderColor: '#903ed8',
                          padding: '10px 15px',
                          marginRight: '10px',
                          borderRadius: '4px',
                        }}
                        key={exp}
                      >
                        <Typography sx={{ fontSize: '12px' }}>{exp}</Typography>
                      </Box>
                    ))}
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
