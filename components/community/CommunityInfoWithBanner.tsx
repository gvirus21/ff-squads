import { Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'

import SocialLinks from 'components/common/SocialLinks'
import { Community } from 'types'

export default function CommunityInfo({ community }: { community: Community }) {
  const coverUrl = community.coverUrl || '/images/default_cover.jpg'
  const logoUrl = community.logoUrl || '/images/forefront.png'

  return (
    <Box display="flex" flexDirection="column" position="relative">
      <Box
        sx={{
          height: '247px',
          width: '100%',
          background: `center / cover no-repeat url(${coverUrl})`,
        }}
      />
      <Box mt={-5} ml={4}>
        <Image src={logoUrl} width={80} height={80} alt="Squad" style={{ borderRadius: '100%', zIndex: 99999 }} />
      </Box>
      <Box position="relative" width="90vw" ml={4}>
        <Box mb={1.5} display="flex" alignItems="center">
          <Typography sx={{ fontSize: '26px', mr: '20px' }}>{community.name}</Typography>
          <Chip
            label={`$${community.tokenInfo.symbol}`}
            sx={{
              mr: '12px',
              padding: '3px 8px',
              fontSize: '14px',
              lineHeight: '17px',
              fontWeight: 400,
              background: '#313236',
              border: '1px solid #606ACB',
              borderRadius: '4px',
            }}
          />
          <SocialLinks socialLinks={community.socialLinks} size={24} />
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
