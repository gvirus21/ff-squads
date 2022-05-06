import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {
  Box,
  Card,
  Chip,
  Collapse,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
  useTheme,
  Button,
  Typography,
  Divider,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Drawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'
import Select from 'react-select'
import TimezoneSelect, { ITimezone, ITimezoneOption } from 'react-timezone-select'

import AuthGuard from '../../../components/AuthGuard'
import CommunityInfoWithBanner from '../../../components/CommunityInfoWithBanner'
import MemberCard from '../../../components/MemberCard'
import { expertiseOptions } from '../../../components/MemberProfileForm'
import darkSelectStyle from '../../../config/darkSelectStyle'
import { useCommunity } from '../../../hooks/useCommunity'
import { AVAILABILITY_LIST, STATUS_LIST } from '../../../config/constants'
import { Member } from '../../../types'

import MembersGroupIcon from '../../../components/icons/MembersGroupIcon'
import ProjectsIcon from '../../../components/icons/ProjectsIcon'
import Page from '../../../components/page'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const drawerWidth = 320

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  background: 'transparent',
  boxShadow: 'none',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const StyledList = styled(List)`
  background: #11151f;
  box-shadow: 4px 10px 35px 0px rgba(245, 255, 244, 0.2);
  border-radius: 6px;
  margin-bottom: 8px;
`

const RoundListItemButton = styled(ListItemButton)`
  border-radius: 6px;
`

type FilterItem = {
  filterBy: string
  filterValue: string | number
  displayValue: string
}

export default function CommunityPage() {
  const [value, setValue] = React.useState(0)
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [expertiseOpen, setExpertiseOpen] = React.useState(true)
  const [statusOpen, setStatusOpen] = React.useState(true)
  const [availabilityOpen, setAvailabiltyOpen] = React.useState(true)
  const [timezoneOpen, setTimezoneOpen] = React.useState(true)
  const router = useRouter()
  const { id } = router.query

  const [selectedTimezone, setSelectedTimezone] = React.useState<string | ITimezone>('')
  const [timezoneFilterItem, setTimezoneFilterItem] = React.useState<FilterItem | null>(null)
  const [keyword, setKeyword] = React.useState('')
  const [filterItems, setFilterItems] = React.useState<FilterItem[]>([])
  const [members, setMembers] = React.useState<Member[] | undefined>([])

  const [filterOpenMobile, setfilterOpenMobile] = React.useState(false)

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const toggleFilter = () => setFilterOpen(!filterOpen)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const addFilterItem = (item: FilterItem) => setFilterItems([...filterItems, item])

  const removeFilterItem = (item: FilterItem) =>
    setFilterItems(filterItems.filter((x) => !(x.filterBy === item.filterBy && x.filterValue === item.filterValue)))

  const handleCheckBoxFilter = (
    filterBy: string,
    filterValue: string | number,
    displayValue: string,
    isAdd: boolean
  ) => {
    if (isAdd) {
      addFilterItem({ filterBy, filterValue, displayValue })
    } else {
      removeFilterItem({ filterBy, filterValue, displayValue })
    }
  }

  const handleExpertiseFilter = (exps: any) => {
    const previousItems = filterItems.filter((x) => x.filterBy == 'expertise')
    const addedItems: FilterItem[] = []
    const removedItems: any[] = []
    for (const exp of exps) {
      if (!previousItems.find((x) => x.filterValue === exp.value)) {
        addedItems.push({ filterBy: 'expertise', filterValue: exp.value, displayValue: exp.value })
      }
    }
    for (const exp of previousItems) {
      if (!exps.find((x: any) => x.value === exp.filterValue)) {
        removedItems.push(exp.filterValue)
      }
    }
    setFilterItems([
      ...filterItems.filter((x) => !(x.filterBy === 'expertise' && removedItems.includes(x.filterValue))),
      ...addedItems,
    ])
  }

  const handleTimezoneFilter = (timezone: ITimezoneOption) => {
    setSelectedTimezone(timezone)
    setTimezoneFilterItem({
      filterBy: 'timezone',
      filterValue: timezone.value,
      displayValue: timezone.value,
    })
  }

  const { data: community } = useCommunity(id)

  React.useEffect(() => {
    if (!community) return

    let result: Member[] = community.members

    if (keyword) {
      result = result.filter((x) => x.username.toLowerCase().includes(keyword.toLowerCase()))
    }

    if (filterItems.length !== 0 || !!timezoneFilterItem) {
      let finalResult: Member[] = []
      if (filterItems.length > 0) {
        filterItems.map(({ filterBy, filterValue }) => {
          if (filterBy === 'expertise') {
            finalResult = [...finalResult, ...result.filter((x) => x.expertise.includes(filterValue as string))]
          } else if (filterBy === 'status') {
            finalResult = [...finalResult, ...result.filter((x) => x.status === (filterValue as number))]
          } else if (filterBy === 'availability') {
            finalResult = [...finalResult, ...result.filter((x) => x.availability === (filterValue as number))]
          }
        })
      }
      if (timezoneFilterItem) {
        finalResult = [...finalResult, ...result.filter((x) => x.timezone === timezoneFilterItem.filterValue)]
      }
      setMembers(finalResult)
      return
    }
    setMembers(result)
  }, [filterItems, timezoneFilterItem, keyword])

  React.useEffect(() => {
    setMembers(community?.members)
  }, [community])

  const toggleDrawerMobile = () => {
    setExpertiseOpen(false)
    setStatusOpen(false)
    setAvailabiltyOpen(false)
    setTimezoneOpen(false)
    setfilterOpenMobile(!filterOpenMobile)
  }

  const drawerComponent = () => (
    <Box role="presentation">
      <Typography fontWeight={600} sx={{ p: 2 }}>
        Filters
      </Typography>
      <StyledList>
        <RoundListItemButton onClick={() => setExpertiseOpen(!expertiseOpen)}>
          <ListItemText primary="Expertise" />
          {expertiseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </RoundListItemButton>
        <Collapse in={expertiseOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 2 }}>
            <Select
              options={expertiseOptions}
              value={filterItems
                .filter((item) => item.filterBy === 'expertise')
                .map(({ filterValue }) => ({ label: filterValue, value: filterValue }))}
              isMulti
              onChange={handleExpertiseFilter}
              styles={darkSelectStyle}
            />
          </Box>
        </Collapse>
      </StyledList>
      <StyledList>
        <RoundListItemButton onClick={() => setStatusOpen(!statusOpen)}>
          <ListItemText primary="Status" />
          {statusOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </RoundListItemButton>
        <Collapse in={statusOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 2 }}>
            <FormGroup>
              {STATUS_LIST.map((status: any) => (
                <FormControlLabel
                  key={status.value}
                  control={
                    <Checkbox
                      checked={!!filterItems.find((x) => x.filterBy === 'status' && x.filterValue === status.value)}
                      onChange={(e) =>
                        handleCheckBoxFilter('status', status.value, status.displayValue, e.target.checked)
                      }
                    />
                  }
                  label={status.displayValue}
                />
              ))}
            </FormGroup>
          </Box>
        </Collapse>
      </StyledList>
      <StyledList>
        <RoundListItemButton onClick={() => setAvailabiltyOpen(!availabilityOpen)}>
          <ListItemText primary="Availability" />
          {availabilityOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </RoundListItemButton>
        <Collapse in={availabilityOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 2 }}>
            <FormGroup>
              {AVAILABILITY_LIST.map((item: any) => (
                <FormControlLabel
                  key={item.value}
                  control={
                    <Checkbox
                      checked={!!filterItems.find((x) => x.filterBy === 'availability' && x.filterValue === item.value)}
                      onChange={(e) =>
                        handleCheckBoxFilter('availability', item.value, item.displayValue, e.target.checked)
                      }
                    />
                  }
                  label={item.displayValue}
                />
              ))}
            </FormGroup>
          </Box>
        </Collapse>
      </StyledList>
      <StyledList>
        <RoundListItemButton onClick={() => setTimezoneOpen(!timezoneOpen)}>
          <ListItemText primary="Time zone" />
          {timezoneOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </RoundListItemButton>
        <Collapse in={timezoneOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 2 }}>
            <TimezoneSelect value={selectedTimezone} onChange={handleTimezoneFilter} styles={darkSelectStyle} />
          </Box>
        </Collapse>
      </StyledList>
      {isMobile && (
        <List>
          <Box display="flex" my={2}>
            <Box mx={'auto'}>
              <Button
                variant="contained"
                sx={{
                  background: '#3E41BB',
                  ':hover': {
                    opacity: 0.7,
                    background: '#3E41BB',
                  },
                }}
                onClick={() => toggleDrawerMobile()}
              >
                SEE RESULTS
              </Button>
            </Box>
          </Box>
          <Divider />
        </List>
      )}
    </Box>
  )

  if (!community) return <></>

  return (
    <Page title={`${community.name||'Community'} | Member Directory | Forefront`}>
      <AuthGuard>
      <Box>
        <CommunityInfoWithBanner community={community} />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={2}>
          <Tabs value={value} onChange={handleTabChange} centered>
            <Tab
              icon={<MembersGroupIcon />}
              iconPosition="start"
              label={`Members (${community.members.length})`}
              {...a11yProps(0)}
            />
            <Tab
              icon={<ProjectsIcon />}
              iconPosition="start"
              label="Projects (Coming soon)"
              {...a11yProps(1)}
              disabled
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box display="flex" position="relative" sx={{ zIndex: 0 }}>
            <AppBar position="absolute" open={filterOpen}>
              <Toolbar sx={{ py: 3 }}>
                {isMobile ? (
                  <Box sx={{ position: 'fixed', bottom: 120, mx: '30%' }}>
                    <Button
                      variant="contained"
                      onClick={() => toggleDrawerMobile()}
                      sx={{
                        background: '#3E41BB',
                        ':hover': {
                          opacity: 0.7,
                          background: '#3E41BB',
                        },
                      }}
                    >
                      FILTERS
                    </Button>
                  </Box>
                ) : (
                  <>
                    <IconButton onClick={toggleFilter} edge="start">
                      {!filterOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <FilterAltOutlinedIcon sx={{ mr: 2 }} />
                  </>
                )}
                <TextField
                  placeholder="Search by name..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: { md: '60%', xs: '100%', sm: '100%' },
                    '.MuiOutlinedInput-root': {
                      borderRadius: '6px',
                    },
                    '.MuiOutlinedInput-input': {
                      padding: '8px',
                    },
                  }}
                />
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  background: '#11151f',
                  boxShadow: '0px 8px 30px 0px rgba(0,0,0,0.12)',
                  position: 'relative',
                  boxSizing: 'border-box',
                  padding: '16px',
                },
              }}
              variant="persistent"
              anchor="left"
              open={filterOpen}
            >
              {drawerComponent()}
            </Drawer>
            <Drawer anchor={'bottom'} open={filterOpenMobile} onClose={() => toggleDrawerMobile()}>
              {drawerComponent()}
            </Drawer>
            <Main open={filterOpen}>
              <DrawerHeader />
              {(filterItems.length > 0 || timezoneFilterItem) && (
                <Box display="flex" alignItems="center" py={2} px={3}>
                  {filterItems.map((item, i) => (
                    <Chip
                      key={i}
                      label={item.displayValue}
                      onDelete={() => removeFilterItem(item)}
                      clickable
                      sx={{ mr: 2 }}
                    />
                  ))}
                  {timezoneFilterItem && (
                    <Chip
                      label={timezoneFilterItem.displayValue}
                      onDelete={() => {
                        setTimezoneFilterItem(null)
                        setSelectedTimezone('')
                      }}
                    />
                  )}
                </Box>
              )}
              {members && (
                <Box display="flex" flexWrap="wrap" justifyContent="center" py={3}>
                  {members.map((member: Member) => (
                    <Box key={member._id} sx={{ px: { md: 3, xs: 0, sm: 0 }, py: { md: 3, xs: 2, sm: 1.5 } }}>
                      <MemberCard member={member} />
                    </Box>
                  ))}
                </Box>
              )}
            </Main>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </AuthGuard>
    </Page>
   
  )
}
