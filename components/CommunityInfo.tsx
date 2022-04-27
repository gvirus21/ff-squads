import { Box, Chip, IconButton, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';

export default function CommunityInfo() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ background: '#fff' }}>
      <Box mb={3}>
        <Image src="/images/forefront.png" width={80} height={80} />
      </Box>
      <Box mb={1.5} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h4" sx={{ mr: 2.5 }}>
          Forefront
        </Typography>
        <Image src="/images/ethereum.svg" width={12} height={20} />
        <Chip label="$FF" sx={{ ml: 1 }} />
      </Box>
      <Typography variant="body1" textAlign="center" sx={{ maxWidth: '676px' }}>
        Forefront is the launchpad empowering web3 explorers to create at the frontier of tokenized communities. We
        strive to empower and serve the Web3 world-builders of tomorrow via literacy, tribe and tools.
      </Typography>
      <Box mt={1} display="flex" justifyContent="center" alignItems="center">
        <IconButton color="primary" sx={{ mr: 3 }}>
          <LanguageIcon />
        </IconButton>
        <IconButton color="primary" sx={{ mr: 3 }}>
          <LanguageIcon />
        </IconButton>
        <IconButton color="primary">
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
