import { Card, CardActionArea, CardContent, Container, Grid } from '@mui/material';
import CommunityInfo from '../../components/CommunityInfo';

import { useCommunities } from '../../hooks/useCommunities';
import { Community } from '../../types';

export default function CommunitiesPage() {
  const { data: communities } = useCommunities();
  return (
    <Container>
      <Grid container spacing={4}>
        {communities &&
          communities.map((community: Community) => (
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