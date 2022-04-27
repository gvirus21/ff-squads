import { Card, CardContent, Grid } from '@mui/material';
import CommunityProfileForm from '../../components/CommunityProfileForm';

export default function CommunityCreatePage() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <CommunityProfileForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
