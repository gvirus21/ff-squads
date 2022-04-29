import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import { Community } from '../types';
import SocialLinks from './SocialLinks';

export default function CommunityInfo({ community }: { community: Community }) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ background: '#fff' }}>
      <Box mb={3}>
        <Image src={community.logoUrl ?? '/images/forefront.png'} width={80} height={80} />
      </Box>
      <Box mb={1.5} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h4" sx={{ mr: 2.5 }}>
          {community.name}
        </Typography>
        <Image src="/images/ethereum.svg" width={12} height={20} />
        <Chip label={`$${community.tokenInfo.symbol}`} sx={{ ml: 1 }} />
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
