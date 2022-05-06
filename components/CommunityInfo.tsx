import { Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import { Community } from '../types'
import EthereumIcon from './icons/EthereumIcon'
import SocialLinks from './SocialLinks'

export default function CommunityInfo({ community }: { community: Community }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <Image src={community.logoUrl || '/images/forefront.png'} width={40} style={{borderRadius:'100%'}} height={40} alt="logo" />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
          {community.name}
        </Typography>
        <Box ml={2} display="flex" justifyContent="center" alignItems="center">
          <EthereumIcon htmlColor="#bac3b9" />
          <Chip label={`$${community.tokenInfo.symbol}`} sx={{ ml: 1 }} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <SocialLinks socialLinks={community.socialLinks} _size={30} />
      </Box>
    </Box>
  )
}
