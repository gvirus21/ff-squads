import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Chip, Collapse, TextField, useMediaQuery, useTheme, Divider } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Drawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { styled } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import TimezoneSelect, { ITimezone, ITimezoneOption } from 'react-timezone-select'

import GradientButton from 'components/common/GradientButton'
import FilterChipDeleteIcon from 'components/icons/FilterChipDeleteIcon'
import MemberCard from 'components/member/MemberCard'
import { expertiseOptions } from 'components/member/MemberProfileForm'
import { AVAILABILITY_LIST, STATUS_LIST } from 'config/constants'
import darkSelectStyle from 'config/darkSelectStyle'
import { Member } from 'types'

const drawerWidth = 265

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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

const SquadFilterChip = styled(Chip)`
  background: #121212;
  border-radius: 4px;
  padding: 11.5px 12px 11.5px 16px;
  font-size: 14px;
  color: #9c9c9c;
  font-weight: 400;
  margin-right: 8px;
`

const StyledList = styled(List)`
  background: #27282b;
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

const memberSearchOptions = [
  {
    label: 'Verified',
    value: 'member',
  },
  {
    label: 'Unverified',
    value: 'holder',
  },
]

export default function MembersTab({ members }: { members: Member[] }) {
  const [expertiseOpen, setExpertiseOpen] = useState(true)
  const [statusOpen, setStatusOpen] = useState(true)
  const [availabilityOpen, setAvailabiltyOpen] = useState(true)
  const [timezoneOpen, setTimezoneOpen] = useState(true)
  const [selectedTimezone, setSelectedTimezone] = useState<string | ITimezone>('')
  const [timezoneFilterItem, setTimezoneFilterItem] = useState<FilterItem | null>(null)
  const [keyword, setKeyword] = useState('')
  const [filterItems, setFilterItems] = useState<FilterItem[]>([])
  const [filterOpenMobile, setFilterOpenMobile] = useState(false)
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [memberType, setMemberType] = useState<any>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const addFilterItem = (item: FilterItem) => setFilterItems([...filterItems, item])

  const removeFilterItem = (item: FilterItem) =>
    setFilterItems(filterItems.filter((x) => !(x.filterBy === item.filterBy && x.filterValue === item.filterValue)))

  const toggleDrawerMobile = () => {
    setExpertiseOpen(false)
    setStatusOpen(false)
    setAvailabiltyOpen(false)
    setTimezoneOpen(false)
    setFilterOpenMobile(!filterOpenMobile)
  }

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

  const drawerComponent = () => (
    <Box role="presentation" sx={{ mb: 6 }}>
      <StyledList>
        <RoundListItemButton onClick={() => setExpertiseOpen(!expertiseOpen)}>
          <ListItemText primary="Expertise" />
          {expertiseOpen ? <ExpandLessIcon htmlColor="#8b8f97" /> : <ExpandMoreIcon htmlColor="#8b8f97" />}
        </RoundListItemButton>
        <Collapse in={expertiseOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 1 }}>
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
          {statusOpen ? <ExpandLessIcon htmlColor="#8b8f97" /> : <ExpandMoreIcon htmlColor="#8b8f97" />}
        </RoundListItemButton>
        <Collapse in={statusOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 1 }}>
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
          {availabilityOpen ? <ExpandLessIcon htmlColor="#8b8f97" /> : <ExpandMoreIcon htmlColor="#8b8f97" />}
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
          {timezoneOpen ? <ExpandLessIcon htmlColor="#8b8f97" /> : <ExpandMoreIcon htmlColor="#8b8f97" />}
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
              <GradientButton onClick={() => toggleDrawerMobile()}>SEE RESULTS</GradientButton>
            </Box>
          </Box>
          <Divider />
        </List>
      )}
    </Box>
  )

  useEffect(() => {
    let result: Member[] = members

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
      setFilteredMembers(finalResult)
      return
    }
    setFilteredMembers(result)
  }, [filterItems, timezoneFilterItem, keyword])

  return (
    <Box display="flex" position="relative" sx={{ zIndex: 0 }} mx={2}>
      <AppBar position="absolute" open={!isMobile}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                lg: 'row',
                md: 'row',
                sm: 'column',
                xs: 'column',
              },
              justifyContent: 'space-between',
              mt: 2,
              width: '100%',
            }}
          >
            <Box sx={{ ml: '5px' }}>
              <TextField
                placeholder="Search members by name or address..."
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
                  '.MuiOutlinedInput-root': {
                    borderRadius: '6px',
                  },
                  '.MuiOutlinedInput-input': {
                    padding: '8px',
                  },
                  minWidth: {
                    lg: '600px',
                    md: '600px',
                    sm: '100%',
                    xs: '100%',
                  },
                  background: '#27282B',
                  border: '1px solid #303236',
                  borderRadius: '6px',
                }}
              />
            </Box>
            <Box
              sx={{
                mt: { lg: 0, md: 0, sm: 2, xs: 2 },
                mr: 1,
                ml: { lg: 0, md: 0, sm: 3, xs: 3 },
              }}
            >
              <Select
                options={memberSearchOptions}
                onChange={(value: any) => setMemberType(value)}
                styles={darkSelectStyle}
                value={memberType}
                placeholder="All Members"
              />
            </Box>
          </Box>
        </Box>
      </AppBar>
      {isMobile ? (
        <>
          <Box
            sx={{
              position: 'fixed',
              bottom: 100,
              width: '90vw',
              display: 'flex',
            }}
          >
            <Box sx={{ mx: 'auto' }}>
              <GradientButton onClick={() => toggleDrawerMobile()}>FILTERS</GradientButton>
            </Box>
          </Box>
          <Drawer anchor="bottom" open={filterOpenMobile} onClose={() => toggleDrawerMobile()}>
            {drawerComponent()}
          </Drawer>
        </>
      ) : (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: '#1F2023',
              position: 'relative',
              padding: '16px',
            },
          }}
          variant="persistent"
          anchor="left"
          open={!isMobile}
        >
          {drawerComponent()}
        </Drawer>
      )}
      <Main
        sx={{
          mt: { lg: 0, md: 0, sm: 8, xs: 8 },
          pb: { lg: 4, md: 4, sm: 18, xs: 18 },
        }}
      >
        <DrawerHeader />
        {(filterItems.length > 0 || timezoneFilterItem || memberType) && (
          <Box display="flex" alignItems="center" py={2} px={2}>
            {filterItems.map((item, i) => (
              <SquadFilterChip
                key={i}
                label={item.displayValue}
                deleteIcon={<FilterChipDeleteIcon />}
                onDelete={() => removeFilterItem(item)}
                clickable
              />
            ))}
            {timezoneFilterItem && (
              <SquadFilterChip
                label={timezoneFilterItem.displayValue}
                deleteIcon={<FilterChipDeleteIcon />}
                onDelete={() => {
                  setTimezoneFilterItem(null)
                  setSelectedTimezone('')
                }}
              />
            )}
            {memberType && (
              <SquadFilterChip
                label={memberType.label}
                deleteIcon={<FilterChipDeleteIcon />}
                onDelete={() => setMemberType(null)}
              />
            )}
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              pt: 1,
            }}
          >
            {filteredMembers.map((member: Member) => (
              <Box
                key={member._id}
                sx={{
                  px: { lg: '5px', md: '5px', xs: 0, sm: 0 },
                  py: { lg: '5px', md: '5px', xs: 2, sm: 1.5 },
                  mx: { lg: '0px', md: '0px', xs: 'auto', sm: 'auto' },
                }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Box>
        </Box>
      </Main>
    </Box>
  )
}
