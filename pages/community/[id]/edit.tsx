import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import AuthGuard from '../../../components/AuthGuard'
import { Box, Card, CardContent, CardHeader , Snackbar, useMediaQuery, useTheme, Grid } from '@mui/material'
import CommunityProfileForm from '../../../components/CommunityProfileForm'
import Image from 'next/image'
import CommunityFormIcon from '../../../components/icons/CommunityFormIcon'
import { useCommunity } from '../../../hooks/useCommunities'
import React, { useCallback, useState } from 'react'
import { Community } from '../../../types'
 

const CommunityEditPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [openSnackbar, setopenSnackbar] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const { data: community, isLoading: loadingCommunity } = useCommunity(id)
  const isLoading = false // fetch from the hook

  React.useEffect(() => {
    if (!community && !loadingCommunity) {
      router.push(`/community`)
    }
  }, [community, loadingCommunity])

   const onSubmit = useCallback((communityInfo: Community) => {
    const payload = {
      ...communityInfo,
      communityId: community?.shortId,
    }
   // editCommunity(payload as Community)
    handleToggleSnackbar()
   }, [])
  
  const handleToggleSnackbar = () => {
    setopenSnackbar(!openSnackbar)
  }

  return (
    <AuthGuard>
      <>
        <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" mt={1} mb={4}>
          <Grid item xs={12} sm={6}>
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
                <CommunityProfileForm community={community} onSubmit={onSubmit} submitting={isLoading} />
              </CardContent>
            </Card>
          </Grid>
          </Grid>
      </>
    </AuthGuard>
  )
}

export default CommunityEditPage
