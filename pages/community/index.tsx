import { Card, CardContent, Container, Grid } from '@mui/material';
import CommunityInfo from '../../components/CommunityInfo';

import useCommunities from '../../hooks/useCommunities';

export default function CommunityPage() {
  const { status, data, error, isFetching } = useCommunities();
  return (
    <Container>
      <Grid container justifyContent="center" spacing={4}>
        {data.map((community: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={community.shortId}>
            <Card>
              <CardContent>
                <CommunityInfo community={community} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
