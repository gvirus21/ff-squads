import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import { Community } from '../types';
import SocialLinks from './SocialLinks';

export default function CommunityInfo({ community }: { community: Community }) {
  return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ background: '#fff' }} mb={2}>
    
        
       
      <Box  display="flex" justifyContent="center" alignItems="center">
        <Image src={community.logoUrl ?? '/images/forefront.png'} width={40} height={40} />
        <Typography variant="h4" sx={{ mx: 2.5 }}>
          {community.name}
        </Typography>
        <Image src="/images/ethereum.svg" width={12} height={20} />
        <Chip label={`$${community.tokenInfo.symbol}`} sx={{ ml: 1 }} />
      </Box>
      
      <Box mt={1} display="flex" justifyContent="center" alignItems="center">
        <SocialLinks socialLinks={community.socialLinks} />
      </Box>
    </Box>
  );
}
