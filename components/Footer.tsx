import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import DiscordIcon from './icons/DiscordIcon'
import MirrorIcon from './icons/MirrorIcon'
import TwitterIcon from './icons/TwitterIcon'

const AppBarWrapper = styled(AppBar)(({ theme }) => ({
  background: '#0C0E15',
}))

export default function Footer() {
  return (
    <AppBarWrapper position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Box py={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography color="textSecondary">JOIN US</Typography>
            <IconButton sx={{ ml: 4 }}>
              <DiscordIcon color="secondary" width={24} />
            </IconButton>
            <IconButton sx={{ ml: 4 }}>
              <TwitterIcon color="secondary" width={24} />
            </IconButton>
            <IconButton sx={{ ml: 4 }}>
              <MirrorIcon color="secondary" width={24} />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Value. Culture. Community
          </Typography>
        </Box>
      </Toolbar>
    </AppBarWrapper>
  )
}
