import { Box, Chip, Typography } from '@mui/material'

import SocialLinks from 'components/common/SocialLinks'
import { Community } from 'types'

export default function CommunityInfo({ community }: { community: Community }) {
  const coverUrl = community.coverUrl || '/images/default_cover.jpg'
  const logoUrl = community.logoUrl || '/images/forefront.png'

  return (
    <Box display="flex" flexDirection="column" position="relative">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          top: '-289px',
          left: { lg: '401.25px', md: '401.25px', sm: 0, xs: 0 },
        }}
      >
        <Box
          sx={{
            background: 'rgba(125, 73, 234, 0.21)',
            opacity: 0.9,
            filter: 'blur(186.623px)',
            borderRadius: '100%',
            width: { lg: '578.36px', md: '578.36px', sm: '10px', xs: '10px' },
            height: { lg: '578.36px', md: '578.36px', sm: '10px', xs: '10px' },
            mx: 'auto',
            zIndex: 999999,
          }}
        />
      </Box>
      <Box
        sx={{
          height: '247px',
          width: '100%',
          background: `center / cover no-repeat url(${coverUrl})`,
        }}
      />
      <Box mt={-5} ml={4}>
        <img src={logoUrl} width={80} height={80} alt="Squad" style={{ borderRadius: '100%', zIndex: 99999 }} />
      </Box>
      <Box position="relative" width="90vw" ml={4}>
        <Box mb={1.5} display="flex">
          <Typography sx={{ fontSize: '26px' }}>{community.name}</Typography>
          <Box ml={1} display="flex" justifyContent="center" alignItems="center">
            <Chip
              label={`$${community.tokenInfo.symbol}`}
              sx={{
                ml: 1,
                mr: 2,
                px: 1,
                py: 0.3,
                fontSize: '14px',
                fontWeight: 400,
                background: '#313236',
                border: '1px solid #303236',
                borderRadius: '4px',
              }}
            />
            <SocialLinks socialLinks={community.socialLinks} size={24} />
          </Box>
        </Box>

        <Box maxWidth="788px">
          <Typography color="text.secondary" sx={{ wordWrap: 'break-word', fontSize: '14px' }} mr={5}>
            {community.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
