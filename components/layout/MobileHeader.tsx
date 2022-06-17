import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import UserProfileMobile from 'components/layout/UserProfileMobile'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function TemporaryDrawer() {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setOpenDrawer(!openDrawer)
  }

  const list = (anchor: Anchor) => (
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      <UserProfileMobile />
    </Box>
  )

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer()}>
          <MenuIcon sx={{ fontSize: '35px', fontWeight: 700 }} />
        </IconButton>
        <Drawer anchor={'bottom'} open={openDrawer} onClose={toggleDrawer()}>
          {list('bottom')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
