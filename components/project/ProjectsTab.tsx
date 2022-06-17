import React, { useState, useEffect } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Box, Typography, useMediaQuery, Grid, useTheme, CardMedia, Collapse } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { styled } from '@mui/material/styles'
import Select from 'react-select'

import ProjectDetailsModal from 'components/project/ProjectDetailsModal'
import ProjectCard from 'components/project/ProjectCard'
import ProjectData from 'components/project/data.json'
import darkSelectStyle from 'config/darkSelectStyle'
import { Project } from 'types'

const sortOptions = [
  {
    label: 'Newest',
    value: 'Newest',
  },
  {
    label: 'Oldest',
    value: 'Oldest',
  },
  {
    label: 'A-Z',
    value: 'A-Z',
  },
]

export default function ProjectsTab() {
  const [projectIsOpen, setProjectIsOpen] = useState(true)
  const [creationTypeIsOpen, setCreationTypeIsOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const drawerWidth = 288
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const ExpandLessIconSquad = styled(ExpandLessIcon)`
    color: #8b8f97;
  `

  const ExpandMoreIconSquad = styled(ExpandMoreIcon)`
    color: #8b8f97;
  `

  const StyledList = styled(List)`
    background: #171717;
    width: 269px;
    border-radius: 6px;
    margin-bottom: 8px;
  `

  const RoundListItemButton = styled(ListItemButton)`
    border-radius: 6px;
  `

  return (
    <Box mx={4} display="flex" flexDirection="column">
      {/* Bg circles */}
      <Box width="700px" height="700px" position="absolute" top="300px" right="-0" overflow="hidden">
        <Box position="relative">
          <Box
            sx={{
              width: '557px',
              height: '557px',
              borderColor: '#B1B1B1',
              opacity: '10%',
              border: 1,
              borderRadius: '1000px',
              position: 'absolute',
              top: '0px',
              right: '-200px',
            }}
          />
          <Box
            sx={{
              width: '557px',
              height: '557px',
              borderColor: '#B1B1B1',
              opacity: '10%',
              border: 1,
              borderRadius: '1000px',
              position: 'absolute',
              top: '60px',
              right: '-100px',
            }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        sx={{
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'flex-start' },
          zIndex: 99999,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: '8px',
            background: 'linear-gradient(88.41deg, #444CFF 0%, #A93EDC 100%)',
            padding: '6px 41px',
            height: '52px',
            width: { xs: '343px', lg: '269px' },
            marginBottom: '20px',
            marginRight: '19px',
          }}
        >
          <Typography fontSize="18px" sx={{ whiteSpace: 'noWrap' }}>
            Submit a Project
          </Typography>
          <CardMedia
            component="img"
            src="/images/send.png"
            style={{
              height: '16px',
              width: '16px',
              marginTop: '0px',
              marginLeft: '14px',
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: {
              xs: '325px',
              sm: '528px',
              md: '806px',
              lg: '1042px',
              xl: '1386px',
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              background: '#27282B',
              width: {
                xs: '254px',
                sm: '420px',
                md: '532px',
                lg: '706px',
                xl: '1095px',
              },
              height: '52px',
              borderRadius: '8px',
              marginLeft: '19px',
            }}
          >
            <CardMedia
              component="img"
              src="/images/search.png"
              style={{
                height: '18px',
                width: '18px',
                marginTop: '0px',
                margin: '0px 17px',
              }}
            />
            <input
              type="text"
              placeholder="Search Projects"
              style={{
                background: '#27282B',
                width: '70%',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#fff',
              }}
            />
          </Box>
          {/* Sort option */}
          <Box width="140px" height="52px">
            <Select options={sortOptions} styles={darkSelectStyle} value={{}} placeholder="Newest" />
          </Box>
        </Box>
      </Box>
      {isModalOpen && (
        <Box
          sx={{
            background: 'rgba(37, 37, 37, 0.86)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: 999999,
          }}
        >
          <Box
            onClick={() => {
              setIsModalOpen(false)
            }}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '1034px',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          >
            <KeyboardBackspaceIcon />
            <Typography
              sx={{
                fontSize: '18px',
                marginLeft: '17px',
              }}
            >
              Go back
            </Typography>
          </Box>
        </Box>
      )}

      <Box display="flex" sx={{ marginTop: { sx: '25px', lg: '0px' }, zIndex: 9999 }}>
        {!isMobile && (
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                background: '#1F2023',
                position: 'relative',
              },
            }}
            variant="persistent"
            anchor="left"
            open={!isMobile}
          >
            <Box sx={{ marginTop: '4px' }}>
              <StyledList sx={{ marginBottom: '10px' }}>
                <RoundListItemButton onClick={() => setProjectIsOpen(!projectIsOpen)}>
                  <ListItemText primary="Projects" />
                  {projectIsOpen ? <ExpandLessIconSquad /> : <ExpandMoreIconSquad />}
                </RoundListItemButton>
                <Collapse in={projectIsOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 1 }}>
                    <Grid container>
                      <Grid item>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">Featured</Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">Open to Collab</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </StyledList>

              <StyledList sx={{ marginBottom: '10px' }}>
                <RoundListItemButton onClick={() => setCreationTypeIsOpen(!creationTypeIsOpen)}>
                  <ListItemText primary="Creation Type" />
                  {creationTypeIsOpen ? <ExpandLessIconSquad /> : <ExpandMoreIconSquad />}
                </RoundListItemButton>
                <Collapse in={creationTypeIsOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 1 }}>
                    <Grid container>
                      <Grid item>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            lineHeight: '16.8px',
                            borderColor: '#8A8F98',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">Music Production</Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">Soundscapes</Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">Spirituality</Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">Videography</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </StyledList>
            </Box>
          </Drawer>
        )}
        <Box sx={{ marginLeft: '19px' }}>
          <Box>
            <Typography sx={{ fontSize: '18px', marginTop: { xs: '25px', lg: '0px' } }}>Featured</Typography>
          </Box>
          <Box sx={{ maxWidth: '1400px' }}>
            <Grid
              container
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
              spacing={0}
              rowSpacing={2}
              sx={{ mt: { xs: '32px', sm: '0' } }}
            >
              {ProjectData.map((project: Project) => (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={project._id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
