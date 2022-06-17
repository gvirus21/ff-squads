import { Box, Container, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import AuthGuard from 'components/layout/AuthGuard'
import CommunityCard from 'components/community/CommunityCard'
import GradientButton from 'components/common/GradientButton'
import Page from 'components/common/Page'
import PageLoading from 'components/common/PageLoading'
import { useCommunities } from 'hooks/useCommunity'
import { Community } from 'types'
import { useAllCommunityHoldings } from 'hooks/useHoldings'

export default function CommunitiesPage() {
  const { data: communities } = useCommunities()
  const { holdings, isLoading } = useAllCommunityHoldings(communities)
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null)
  const router = useRouter()

  const eligibleCommunities = useMemo(() => {
    if (communities) {
      return communities.filter((community: Community) => {
        const holding = holdings.find(({ communityId }) => communityId === community.shortId)
        if (!holding) return false
        return holding.userHoldings >= community.minimumHoldingForMembership
      })
    }
    return []
  }, [communities, holdings])

  const handleContinue = () => {
    router.push(`/community/${selectedCommunityId}`)
  }

  if (isLoading) return <PageLoading />

  return (
    <Page title="Communities | Member Directory | Forefront">
      <AuthGuard>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '90vh',
          }}
        >
          <Box sx={{ mt: 7, pb: { lg: 10, md: 10, sm: 15, xs: 15 } }}>
            {eligibleCommunities.length > 0 ? (
              <Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ maxWidth: '610px', mx: 'auto' }}>
                    <Typography
                      sx={{
                        fontSize: '24px',
                        lineHeight: '28.8px',
                        textAlign: 'center',
                      }}
                    >
                      Great, according to your on-chain credentials you might belong to the following communities
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 5,
                    mx: { lg: 10, md: 10, sm: 'auto', xs: 'auto' },
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  {eligibleCommunities.map((community: Community) => (
                    <Box
                      key={community.shortId}
                      sx={{
                        mx: { lg: 1.5, md: 1.5, sm: 'auto', xs: 'auto' },
                        my: 1.5,
                      }}
                      onClick={() => setSelectedCommunityId(community.shortId)}
                    >
                      <CommunityCard
                        community={community}
                        selected={selectedCommunityId === community.shortId}
                        tokenHoldings={
                          holdings.find(({ communityId }: any) => community.shortId === communityId)?.userHoldings
                        }
                      />
                    </Box>
                  ))}
                </Box>
                <Box mt={5} mb={3} display="flex">
                  <Box mx="auto">
                    <GradientButton disabled={selectedCommunityId === null} onClick={handleContinue}>
                      Select and Continue
                    </GradientButton>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '652px',
                }}
              >
                <Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '24px',
                        lineHeight: '28.8px',
                      }}
                    >
                      You do not hold any membership tokens from our supported communities. Visit our marketplace to
                      discover new communities, and swap to get access.
                    </Typography>
                  </Box>
                  <Box mt={5}>
                    <GradientButton href="https://forefront.market/market">FF Marketplace</GradientButton>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </AuthGuard>
    </Page>
  )
}
