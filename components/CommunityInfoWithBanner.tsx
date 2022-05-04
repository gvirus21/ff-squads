import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import { Community } from '../types';
import SocialLinks from './SocialLinks';
import Link from 'next/link'
import EthereumIcon from './icons/EthereumIcon'

export default function CommunityInfo({ community }: { community: Community }) {

    const maxWidth =  () => {
        return Math.round(window.screen.width)+'px';
    }
  
  return (
      <Box display="flex" flexDirection="column"   alignItems="center" position="relative" >
          <Box mt={-4} sx={{ filter: 'drop-shadow(4px 10px 35px rgba(245, 255, 244, 0.2))'}}>
              <Image src={community?.coverUrl ?? '/images/forefront_cover.png'} width={maxWidth()} height={'80vh'} />
          </Box>
          
          <Box mt={-6} >
              <Box  >
                <Image src={community.logoUrl ?? '/images/forefront.png'} width={80} height={80} />
              </Box>
              <Box sx={{mt:-5,position:'absolute', right:20, cursor : 'pointer' }}>
                  <Link href={`/community/${community.shortId}/edit`}>
                      <Image src={'/images/CommunityEditIcon.svg'} width={20} height={20} />
                  </Link>
              </Box>
          </Box>
          
      <Box mb={1.5} display="flex" justifyContent="center" alignItems="center">
              <Typography   sx={{ fontWeight: 600, fontSize : "18px" }}>
                {community.name}
              </Typography>
              <Box ml={2} display="flex" justifyContent="center" alignItems="center">
                  <EthereumIcon htmlColor="#bac3b9" />
                  <Chip label={`$${community.tokenInfo.symbol}`} sx={{ ml: 1 }} />
              </Box>
      </Box>
      <Typography variant="body1" textAlign="center" sx={{ mx : '20px'  }}>
        {community.description}
      </Typography>
      <Box mt={1} display="flex" justifyContent="center" alignItems="center">
              <SocialLinks socialLinks={community.socialLinks} _size={24} />
      </Box>
    </Box>
  );
}
