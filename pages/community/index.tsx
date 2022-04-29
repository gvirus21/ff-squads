import { Card, CardActionArea, CardContent, Container, Grid } from '@mui/material';
import CommunityInfo from '../../components/CommunityInfo';

import { useCommunities } from '../../hooks/useCommunities';

export default function CommunitiesPage() {
  const { status, data: communities, error, isFetching } = useCommunities();
  return (
    <Container>
      <Grid container spacing={4}>
        {communities &&
          communities.map((community: any) => (
            <Grid item xs={12} sm={6} key={community.shortId}>
              <Card>
                <CardActionArea href={`/community/${community.shortId}`}>
                  <CardContent>
                    <CommunityInfo community={community} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
