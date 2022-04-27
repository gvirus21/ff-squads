import { Box, Card, CardContent, CardHeader, CardActions, Chip, IconButton, Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';

export default function MemberCard() {
  return (
    <Card>
      <CardHeader
        avatar={<Image src="/images/member.png" width={64} height={64} style={{ borderRadius: '100%' }} />}
        title="Ed — S ∞ 2"
        titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
        subheader="AmzING#1467"
        subheaderTypographyProps={{ variant: 'body1', color: 'textPrimary' }}
      />
      <CardContent>
        <Box display="flex" alignItems="center">
          <Chip label="Toronto, Canada" sx={{ mr: 1 }} />
          <span>GMT+12:00</span>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <TwitterIcon color="primary" />
        </IconButton>
        <IconButton>
          <LinkedInIcon color="primary" />
        </IconButton>
        <IconButton>
          <InstagramIcon color="primary" />
        </IconButton>
        <Button size="small" variant="contained" color="secondary" sx={{ marginLeft: 'auto' }}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
