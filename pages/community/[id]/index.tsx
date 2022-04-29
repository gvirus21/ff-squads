import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip, Collapse, Grid, Tab, Tabs, TextField } from '@mui/material';
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
import { useRouter } from 'next/router';
import React from 'react';
import Select from 'react-select';
import TimezoneSelect, { ITimezone, ITimezoneOption } from 'react-timezone-select';

import AuthGuard from '../../../components/AuthGuard';
import CommunityInfo from '../../../components/CommunityInfo';
import MemberCard from '../../../components/MemberCard';
import { expertiseOptions } from '../../../components/MemberProfileForm';
import { useCommunity } from '../../../hooks/useCommunities';
import { AVAILABILITY_LIST, STATUS_LIST } from '../../../config/constants';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  position: 'static',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  position: 'static',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  position: 'static',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

type FilterItem = {
  filterBy: string;
  filterValue: string | number;
  displayValue: string;
};

export default function CommunityPage() {
  const [value, setValue] = React.useState(0);
  const [filterOpen, setFilterOpen] = React.useState(true);
  const [expertiseOpen, setExpertiseOpen] = React.useState(true);
  const [statusOpen, setStatusOpen] = React.useState(true);
  const [availabilityOpen, setAvailabiltyOpen] = React.useState(true);
  const [timezoneOpen, setTimezoneOpen] = React.useState(true);
  const router = useRouter();
  const { id } = router.query;

  const [selectedTimezone, setSelectedTimezone] = React.useState<string | ITimezone>('');
  const [timezoneFilterItem, setTimezoneFilterItem] = React.useState<FilterItem | null>(null);
  const [filterItems, setFilterItems] = React.useState<FilterItem[]>([]);

  const toggleFilter = () => setFilterOpen(!filterOpen);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addFilterItem = (item: FilterItem) => setFilterItems([...filterItems, item]);

  const removeFilterItem = (item: FilterItem) =>
    setFilterItems(filterItems.filter((x) => !(x.filterBy === item.filterBy && x.filterValue === item.filterValue)));

  const handleCheckBoxFilter = (
    filterBy: string,
    filterValue: string | number,
    displayValue: string,
    isAdd: boolean
  ) => {
    if (isAdd) {
      addFilterItem({ filterBy, filterValue, displayValue });
    } else {
      removeFilterItem({ filterBy, filterValue, displayValue });
    }
  };

  const handleExpertiseFilter = (exps: any) => {
    const previousItems = filterItems.filter((x) => x.filterBy == 'expertise');
    const addedItems: FilterItem[] = [];
    const removedItems: any[] = [];
    for (const exp of exps) {
      if (!previousItems.find((x) => x.filterValue === exp.value)) {
        addedItems.push({ filterBy: 'expertise', filterValue: exp.value, displayValue: exp.value });
      }
    }
    for (const exp of previousItems) {
      if (!exps.find((x: any) => x.value === exp.filterValue)) {
        removedItems.push(exp.filterValue);
      }
    }
    setFilterItems([
      ...filterItems.filter((x) => !(x.filterBy === 'expertise' && removedItems.includes(x.filterValue))),
      ...addedItems,
    ]);
  };

  const handleTimezoneFilter = (timezone: ITimezoneOption) => {
    setSelectedTimezone(timezone);
    setTimezoneFilterItem({
      filterBy: 'timezone',
      filterValue: timezone.label,
      displayValue: timezone.label,
    });
  };

  const { data: community } = useCommunity(id);

  React.useEffect(() => {
    if (filterItems.length > 0) {
      console.log(filterItems);
    }
    if (timezoneFilterItem) {
      console.log(timezoneFilterItem);
    }
  }, [filterItems, timezoneFilterItem]);

  return community ? (
    <AuthGuard>
      <Box>
        <CommunityInfo community={community} />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={2}>
          <Tabs value={value} onChange={handleTabChange} centered>
            <Tab label={`Members (${community.members.length})`} {...a11yProps(0)} />
            <Tab label="Projects (Coming soon)" {...a11yProps(1)} disabled />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box display="flex" justifyContent="center">
            <Drawer variant="permanent" open={filterOpen}>
              <DrawerHeader>
                <IconButton onClick={toggleFilter}>
                  {!filterOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
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
            </Drawer>
            <Box flexGrow={1} py={4} px={7} sx={{ backgroundColor: '#FAFAFA' }}>
              <TextField fullWidth placeholder="Search by name, location, or expertise" />
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
                      setTimezoneFilterItem(null);
                      setSelectedTimezone('');
                    }}
                  />
                )}
              </Box>
              <Grid container spacing={3}>
                {community.members.map((member: any) => (
                  <Grid item xs={12} sm={6} md={4} key={member._id}>
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
    </AuthGuard>
  ) : (
    <></>
  );
}
