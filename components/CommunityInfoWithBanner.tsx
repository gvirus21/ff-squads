import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import { Community } from '../types';
import SocialLinks from './SocialLinks';

export default function CommunityInfo({ community }: { community: Community }) {

    const maxWidth =  () => {
        return Math.round(window.innerWidth)+'px';
    }
  
  return (
      <Box display="flex" flexDirection="column"   alignItems="center" sx={{ background: '#fff',  }}>
          <Box mt={-4}>
              <Image src={community?.coverUrl ?? '/images/forefront_cover.png'} width={maxWidth()} height={80} />
          </Box>
          <Box mt={-6} sx={{ border: 2, borderRadius: '50%', borderColor: "#fff"}} >
             <Image src={community.logoUrl ?? '/images/forefront.png'} width={80} height={80} />
          </Box>
      <Box mb={1.5} display="flex" justifyContent="center" alignItems="center">
              <Typography   sx={{ fontWeight: 600, fontSize : "18px" }}>
            {community.name}
              </Typography>
              <Box sx={{ margin : '5px 10px', }}>
                  <Image src="/images/ethereum.svg" width={12} height={20} />
              </Box>
              <Box sx={{ margin: '5px 10px', }}>
                  <Chip label={`$${community.tokenInfo.symbol}`} />
              </Box>
      </Box>
      <Typography variant="body1" textAlign="center" sx={{ maxWidth: '676px' }}>
        {community.description}
      </Typography>
      <Box mt={1} display="flex" justifyContent="center" alignItems="center">
        <SocialLinks socialLinks={community.socialLinks} />
      </Box>
    </Box>
  );
}
