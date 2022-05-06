import { Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import EthereumIcon from './icons/EthereumIcon'
import SocialLinks from './SocialLinks'
import { Community } from '../types'

export default function CommunityInfo({ community }: { community: Community }) {
  const coverUrl = community.coverUrl || '/images/default_cover.jpg'
  const logoUrl = community.logoUrl || '/images/forefront.png'

  return (
    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
      <Box
        sx={{
          filter: 'drop-shadow(4px 10px 35px rgba(245, 255, 244, 0.2))',
          width: '100%',
          height: '96px',
          background: `center / cover no-repeat url(${coverUrl})`,
        }}
      />
      <Box mt={-6}>
        <Image src={logoUrl} width={80} height={80} alt="logo" />
      </Box>
      <Box position="relative" width="100%">
        <Box mb={1.5} display="flex" justifyContent="center" alignItems="center">
          <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>{community.name}</Typography>
          <Box ml={2} display="flex" justifyContent="center" alignItems="center">
            <EthereumIcon htmlColor="#bac3b9" />
            <Chip label={`$${community.tokenInfo.symbol}`} sx={{ ml: 1 }} />
          </Box>
        </Box>
        <Typography variant="body1" textAlign="center" sx={{ mx: '20px' }}>
          {community.description}
        </Typography>
        <Box mt={1} display="flex" justifyContent="center" alignItems="center">
          <SocialLinks socialLinks={community.socialLinks} _size={24} />
        </Box>
        <Box sx={{ position: 'absolute', right: 20, top: -20, cursor: 'pointer' }}>
          <Link href={`/community/${community.shortId}/edit`}>
            <Image src={'/images/CommunityEditIcon.svg'} width={20} height={20} alt="edit" />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
