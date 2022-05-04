import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import AuthGuard from '../../../components/AuthGuard'
import { Box, Card, CardContent, CardHeader } from '@mui/material'
import CommunityProfileForm from '../../../components/CommunityProfileForm'
import Image from 'next/image'
import CommunityFormIcon from '../../../components/icons/CommunityFormIcon'
import { useCommunity } from '../../../hooks/useCommunities'

const CommunityEditPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: community, isLoading: loadingCommunity } = useCommunity(id)

  return (
    <AuthGuard>
      <>
        <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={2}>
          <Box>
            <Card sx={{ overflow: 'visible', boxShadow: '4px 10px 35px rgba(245, 255, 244, 0.2)' }}>
              <CardHeader
                avatar={<CommunityFormIcon color="success" />}
                title="Edit Community Profile"
                titleTypographyProps={{
                  color: '#CDFCB1',
                  fontWeight: 600,
                  fontSize: '16px',
                }}
              />
              <CardContent sx={{ padding: 4 }}>
                <CommunityProfileForm />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </>
    </AuthGuard>
  )
}

export default CommunityEditPage
