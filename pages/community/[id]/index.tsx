import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip, Collapse, Grid, Tab, Tabs, TextField, useMediaQuery, useTheme, Button, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, Theme, CSSObject } from '@mui/material/styles';



import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Select from 'react-select';
import TimezoneSelect, { ITimezone, ITimezoneOption } from 'react-timezone-select';

import AuthGuard from '../../../components/AuthGuard';
import CommunityInfoWithBanner from '../../../components/CommunityInfoWithBanner';
import MemberCard from '../../../components/MemberCard';
import { expertiseOptions } from '../../../components/MemberProfileForm';
import { useCommunity } from '../../../hooks/useCommunities';
import { AVAILABILITY_LIST, STATUS_LIST } from '../../../config/constants';
import { Member } from '../../../types';

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


const drawerWidth = 270;


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
    position: 'static',
    boxSizing: 'border-box',
    background: '#FCFDF0',
    boxShadow: '0px 10px 45px #E5ECE3',   
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  position: 'static',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
});


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  position: 'static',
  flexShrink: 0,
  whiteSpace: 'nowrap',
 
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

type FilterItem = {
  filterBy: string
  filterValue: string | number
  displayValue: string
}

export default function CommunityPage() {
  const [value, setValue] = React.useState(0);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [expertiseOpen, setExpertiseOpen] = React.useState(true);
  const [statusOpen, setStatusOpen] = React.useState(true);
  const [availabilityOpen, setAvailabiltyOpen] = React.useState(true);
  const [timezoneOpen, setTimezoneOpen] = React.useState(true);
  const router = useRouter();
  const { id } = router.query;

    const [selectedTimezone, setSelectedTimezone] = React.useState<string | ITimezone>('')
    const [timezoneFilterItem, setTimezoneFilterItem] = React.useState<FilterItem | null>(null)
    const [keyword, setKeyword] = React.useState('')
    const [filterItems, setFilterItems] = React.useState<FilterItem[]>([])
    const [members, setMembers] = React.useState<Member[] | undefined>([])

    const [anchorValue, setanchorValue] = React.useState("left");
    const [openDrawerMobile, setopenDrawerMobile] = React.useState(false);

    const toggleFilter = (_anchor: string) => {
        setanchorValue(_anchor || "left");
    
        setFilterOpen(!filterOpen);
    }

    const toggleDrawerMobile = () => {
        setopenDrawerMobile((openDrawerMobile) => !openDrawerMobile)
        setExpertiseOpen(false);
        setStatusOpen(false);
        setAvailabiltyOpen(false);
        setTimezoneOpen(false);
    }

    const theme = useTheme();

  

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));




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



    const list = (anchor: string) => (
        <Box
            role="presentation"
        >
            <List>
                <Box sx={{ p: 2 }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600 }} >
                      Filters
                    </Typography>
                </Box>
            </List>
            <List>
                <ListItemButton onClick={() => setExpertiseOpen(!expertiseOpen)}>
                    <ListItemText primary="Expertise" />
                    {expertiseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Divider />
                <Collapse in={expertiseOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                        <Select
                            options={expertiseOptions}
                            value={filterItems
                                .filter((item) => item.filterBy === 'expertise')
                                .map(({ filterValue }) => ({ label: filterValue, value: filterValue }))}
                            isMulti
                            onChange={handleExpertiseFilter}
                        />
                    </Box>
                    <Divider />
                </Collapse>
            </List>
            <List>
                <ListItemButton onClick={() => setStatusOpen(!statusOpen)}>
                    <ListItemText primary="Status" />
                    {statusOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Divider />
                <Collapse in={statusOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                        <FormGroup>
                            {STATUS_LIST.map((status: any) => (
                                <FormControlLabel
                                    key={status.value}
                                    control={
                                        <Checkbox
                                            checked={
                                                !!filterItems.find((x) => x.filterBy === 'status' && x.filterValue === status.value)
                                            }
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
                    <Divider />
                </Collapse>
            </List>
            <List>
                <ListItemButton onClick={() => setAvailabiltyOpen(!availabilityOpen)}>
                    <ListItemText primary="Availability" />
                    {availabilityOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Divider />
                <Collapse in={availabilityOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                        <FormGroup>
                            {AVAILABILITY_LIST.map((item: any) => (
                                <FormControlLabel
                                    key={item.value}
                                    control={
                                        <Checkbox
                                            checked={
                                                !!filterItems.find((x) => x.filterBy === 'availability' && x.filterValue === item.value)
                                            }
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
                    <Divider />
                </Collapse>
            </List>
            <List>
                <ListItemButton onClick={() => setTimezoneOpen(!timezoneOpen)}>
                    <ListItemText primary="Time zone" />
                    {timezoneOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Divider />
                <Collapse in={timezoneOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                        <TimezoneSelect value={selectedTimezone} onChange={handleTimezoneFilter} />
                    </Box>
                    <Divider />
                </Collapse>
            </List>
            {isMobile&&<List>
                <Box display="flex" my={2} >
                    <Box mx={'auto'}>
                        <Button variant="contained" onClick={() => toggleDrawerMobile()}  >SEE RESULTS</Button>
                    </Box>
                </Box>
                <Divider />
            </List>}
        </Box>
    );

  return community ? (
      <AuthGuard>
          <>
              <CommunityInfoWithBanner community={community} />
              <Box mb={12} sx={{ position: 'relative' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={2}>
              <Tabs value={value} onChange={handleTabChange} centered>
                 <Tab icon={<CustomIcon _src="/images/CommunityGroup.svg" />} iconPosition="start" label={`Members (${community.members.length})`} {...a11yProps(0)} />
                 <Tab icon={<CustomIcon _src="/images/ProjectsIcon.svg" />} iconPosition="start" label="Projects (Coming soon)" {...a11yProps(1)} disabled />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box display="flex" justifyContent="center" > 
                          <Drawer open={filterOpen} variant="permanent" onClose={() => { toggleFilter("left") }}  
                          >
                              {list('left')}
                           </Drawer>

                          <MuiDrawer
                              anchor={'bottom'}
                              open={openDrawerMobile}
                              onClose={() =>  toggleDrawerMobile() }
                          >
                              {list('bottom')}
                          </MuiDrawer>



                          <Box flexGrow={1} py={4} px={7} sx={{ background: '#FCFDF0', boxShadow: '0px 10px 45px #E5ECE3' }} >
                          <Box sx={{ display: "flex"}} >

                                  {isMobile ?
                                      (<Box sx={{ position: 'fixed', bottom: 90, mx: '20%' }}>
                                          <Button variant="contained" onClick={() =>  toggleDrawerMobile() }  >FILTERS</Button>
                                      </Box>)
                                      :
                                      (<IconButton onClick={() => { toggleFilter("left") }} >
                                        {!filterOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                        <CustomIcon _src="/images/FilterIcon.svg" />
                                        </IconButton>)
                                 }
                              
                          <TextField
                            sx={{ margin: ".1rem 1rem", width : "100%" } }
                            placeholder="Search by name..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                                      />
                          </Box>
              <Box display="flex" alignItems="center" my={2}>
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
              <Grid container  >
                {members &&
                  members.map((member: any) => (
                      <Grid item xs={12} sm={6} md={3} key={member._id}   alignItems="center">
                        <MemberCard member={member} />
                      </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        </Box>
        </>
    </AuthGuard>
  ) : (
    <></>
  )
}


const CustomIcon = ({ _src } :{ _src:any}) => {
    return (
        <Box>
            <Image src={_src} width={20} height={17} alt="logo" />              
        </Box>
    )
}