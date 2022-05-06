import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import AuthGuard from '../../components/AuthGuard'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React, { useCallback } from 'react'

import CommunityProfileForm, { communityProfileFormDefault } from '../../components/CommunityProfileForm'
import CommunityFormIcon from '../../components/icons/CommunityFormIcon'
import { useCreateCommunity } from '../../hooks/useCommunity'
import { CommunityProfileInfo } from '../../types'

const CommunityCreatePage: NextPage = () => {
  const router = useRouter()

  const { mutate: createCommunity, isLoading } = useCreateCommunity({
    onSuccess: () => {
      router.push(`/community`)
    },
  })

  const onSubmit = useCallback((info: CommunityProfileInfo) => {
    const payload = new FormData()
    payload.append('name', info.name)
    payload.append('description', info.description)
    payload.append('socialIds', JSON.stringify(info.socialIds))
    payload.append('socialLinks', JSON.stringify(info.socialLinks))
    payload.append('tokenInfo', JSON.stringify(info.tokenInfo))
    if (info.coverFile && info.coverFile.length > 0) {
      payload.append('coverFile', info.coverFile[0], info.coverFile[0].name)
    }
    if (info.logoFile && info.logoFile.length > 0) {
      payload.append('logoFile', info.logoFile[0], info.logoFile[0].name)
    }
    createCommunity(payload)
  }, [])

  return (
    <AuthGuard>
      <>
        <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" mt={1} mb={4}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ overflow: 'visible', boxShadow: '4px 10px 35px rgba(245, 255, 244, 0.2)' }}>
              <CardHeader
                avatar={<CommunityFormIcon color="success" />}
                title="Create Community Profile"
                titleTypographyProps={{
                  color: '#CDFCB1',
                  fontWeight: 600,
                  fontSize: '16px',
                }}
              />
              <CardContent sx={{ padding: 4 }}>
                <CommunityProfileForm
                  community={{ ...communityProfileFormDefault }}
                  onSubmit={onSubmit}
                  submitting={isLoading}
                  submitText="Create"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </AuthGuard>
  )
}

export default CommunityCreatePage
