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
        <Box padding={'16px'}>
          <Box display="flex" alignItems="center"  >
            <Typography color="#BAC3B9" fontWeight="500">JOIN US</Typography>
             <a href="https://forefront.community/" target="_blank" rel="noreferrer"  >
                <IconButton sx={{ ml: 2 , mt :1 }}>
                    <DiscordIcon color="secondary"   sx={{fontSize:'30px'}} />
                </IconButton>
            </a>
            <a href="https://twitter.com/forefront__" target="_blank" rel="noreferrer" >
                          <IconButton sx={{ ml: 1.5 }}>
                              <TwitterIcon color="secondary" sx={{ fontSize: '24px' }}  />
                           </IconButton>
            </a>
            <a href="https://forefront.mirror.xyz/" target="_blank" rel="noreferrer" >
                          <IconButton sx={{ ml: 1.5 , mt :-.5  }}>
                              <MirrorIcon color="secondary" sx={{ fontSize: '20px' }}  />
                          </IconButton>
            </a>
          </Box>
            <Typography variant="body2" color="#BAC3B9" fontWeight="300">
                Value. Culture. Community
            </Typography>
        </Box>
      </Toolbar>
    </AppBarWrapper>
  )
}
