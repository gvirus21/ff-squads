import React, { useState, useEffect } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Box, Typography, useMediaQuery, Grid, Chip, useTheme, CardMedia, Collapse } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { styled } from '@mui/material/styles'
import Select from 'react-select'
import ProjectData from '../../data/ProjectData.json'
import ProjectDetailsModal from './project-details-modal'
import { Project } from '../../types'
import darkSelectStyle from '../../config/darkSelectStyle'
import FilterChipDeleteIcon from '../icons/FilterChipDeleteIcon'
import AdjustmentIcon from 'public/images/adjustment-icon.png'
import Image from 'next/image'

import ProjectCard from './project-card'

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

type sortSelect = {
  label: string
  value: string
}

const SquadFilterChips = styled(Chip)`
  background: #121212;
  border-radius: 4px;
  padding: 11.5px 12px 11.5px 16px;
  font-size: 14px;
  color: #9c9c9c;
  font-weight: 400;
  margin-right: 8px;
`

export default function ProjectsTab() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [projectIsOpen, setProjectIsOpen] = useState(true)
  const [creationTypeIsOpen, setCreationTypeIsOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expertiseTags, setExpertiseTags] = useState<string[]>([])
  const [filterTags, setFilterTags] = useState<string[]>(['All'])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(ProjectData)
  const [sortValue, setSortValue] = useState<sortSelect>({ label: 'Newest', value: 'Newest' })

  const drawerWidth = 288
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

  const updateExpertTags = () => {
    const tags: string[] = []

    ProjectData.forEach((project: Project) => {
      project.expertise.forEach((expTag) => {
        if (!tags.includes(expTag)) {
          tags.push(expTag)
        }
      })
    })

    setExpertiseTags(tags)
  }

  const updateFilteredProjects = () => {
    let filteredProjectslist: Project[] = []

    if (filterTags.includes('All')) {
      filteredProjectslist = [...ProjectData]
    }

    if (filterTags.includes('Open to Collab')) {
      const openToCollabProjects = ProjectData.filter((project) => project.openToCollab === true)

      const updatedProjectList: Project[] = []

      openToCollabProjects.forEach((_project: Project) => {
        if (!filteredProjectslist.includes(_project)) {
          updatedProjectList.push(_project)
        }
      })

      filteredProjectslist = [...filteredProjectslist, ...updatedProjectList]
    }

    if (filterTags.includes('Featured')) {
      const featuredProjects = ProjectData.filter((project) => project.isFeatured === true)

      const updatedProjectList: Project[] = []

      featuredProjects.forEach((_project: Project) => {
        if (!filteredProjectslist.includes(_project)) {
          updatedProjectList.push(_project)
        }
      })

      filteredProjectslist = [...filteredProjectslist, ...updatedProjectList]
    }

    filterTags.forEach((tag: string) => {
      ProjectData.forEach((_project: Project) => {
        if (_project.expertise.includes(tag)) {
          if (!filteredProjectslist.includes(_project)) {
            filteredProjectslist.push(_project)
          }
        }
      })
    })

    setFilteredProjects(filteredProjectslist)
  }

  const handleSortOptionChange = (val: any) => {
    setSortValue(val)
  }

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

  useEffect(() => {
    updateExpertTags()
  }, [])

  useEffect(() => {
    updateFilteredProjects()
  }, [filterTags])

  const addToFilter = (tag: string) => {
    if (!filterTags.includes(tag)) {
      const tags = [...filterTags, tag]
      setFilterTags(tags)
    }
  }

  useEffect(() => {

    if (sortValue.value === 'Newest') {
      const filteredProjectsList = [...filteredProjects]
       filteredProjectsList.sort((a: Project, b: Project): number => {
         const aDate = new Date(a.createdAt)
         const bDate = new Date(b.createdAt)

         if (aDate > bDate) {
          return -1
         } else if (aDate < bDate) {
           return 1
        }
         return 0
       })

       setFilteredProjects(filteredProjectsList)

    } else if (sortValue.value === 'Oldest') {
      
      const filteredProjectsList = [...filteredProjects]
      filteredProjectsList.sort((a: Project, b: Project): number => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)

        if (aDate > bDate) {
          return 1
        } else if (aDate < bDate) {
          return -1
        }
        return 0
      })

      setFilteredProjects(filteredProjectsList)


    } else if (sortValue.value === 'A-Z') {

      const filteredProjectsList = [...filteredProjects]

      filteredProjectsList.sort((a: Project, b: Project): number => {
        if (a.projectTitle > b.projectTitle) {
          return 1
        } else if (a.projectTitle < b.projectTitle) {
          return -1
        }
        return 0
      })

      setFilteredProjects(filteredProjectsList)
    }
  }, [sortValue])

  const removeFilterItem = (tag: string) => {
    setFilterTags(filterTags.filter((x) => x !== tag))
  }

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
          justifyContent: { xs: 'center', lg: 'flex-start' },
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
            width: { xs: '290px', md: '343px', lg: '269px' },
            marginBottom: '20px',
            marginRight: { xs: '0', lg: '19px' },
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
              md: '650px',
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
                lg: '680px',
                xl: '1000px',
              },
              height: '46px',
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
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
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
          {isTablet ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '46px',
                width: '46px',
                background: '#27282B',
                borderRadius: '8px',
              }}
            >
              <Image src={AdjustmentIcon} alt="adjustment-gear" height="15.5px" width="17.5px" />
            </Box>
          ) : (
            <Box width="140px" height="52px">
              <Select
                options={sortOptions}
                styles={darkSelectStyle}
                value={sortValue}
                onChange={handleSortOptionChange}
              />
            </Box>
          )}
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

      <Box display="flex" sx={{ marginTop: { xs: '25px', lg: '0px' }, zIndex: 9999 }}>
        {!isTablet && (
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
                          onClick={() => {
                            addToFilter('All')
                          }}
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            cursor: 'pointer',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">All</Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box
                          onClick={() => {
                            addToFilter('Featured')
                          }}
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            cursor: 'pointer',
                            borderRadius: '8px',
                          }}
                        >
                          <Typography fontSize="14px">Featured</Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box
                          onClick={() => {
                            addToFilter('Open to Collab')
                          }}
                          sx={{
                            padding: '8px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            border: 1,
                            borderColor: '#8A8F98',
                            cursor: 'pointer',
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
                  <ListItemText primary="Project Type" />
                  {creationTypeIsOpen ? <ExpandLessIconSquad /> : <ExpandMoreIconSquad />}
                </RoundListItemButton>
                <Collapse in={creationTypeIsOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 1 }}>
                    <Grid container>
                      {expertiseTags.map((expertise: string, index: number) => {
                        return (
                          <Grid item key={index}>
                            <Box
                              onClick={() => {
                                addToFilter(expertise)
                              }}
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
                                cursor: 'pointer',
                              }}
                            >
                              <Typography fontSize="14px">{expertise}</Typography>
                            </Box>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Box>
                </Collapse>
              </StyledList>
            </Box>
          </Drawer>
        )}
        <Box sx={{ marginLeft: { xs: '-20px', lg: '19px' } }}>
          {/* tags input container */}
          <Box sx={{ margin: { xs: '0 auto', lg: '0' }, width: { xs: '70vw', lg: '50vw' } }}>
            {filterTags.map((tag: string) => {
              return (
                <SquadFilterChips
                  key={tag}
                  label={tag}
                  deleteIcon={<FilterChipDeleteIcon />}
                  onDelete={() => removeFilterItem(tag)}
                  clickable
                />
              )
            })}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', lg: 'flex-start' },
                pt: 1,
              }}
            >
              {filteredProjects
                .filter((project: Project) => {
                  if (searchTerm === '') {
                    return project
                  } else if (
                    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.about.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return project
                  }
                })
                .map((project: Project) => {
                  return (
                    <Box
                      key={project._id}
                      sx={{
                        px: { lg: '5px', md: '5px', xs: 0, sm: 0 },
                        py: { lg: '5px', md: '5px', xs: 2, sm: 1.5 },
                        mx: { lg: '0px', md: '0px', xs: 'auto', sm: 'auto' },
                      }}
                    >
                      <ProjectCard project={project} />
                    </Box>
                  )
                })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
