import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import CommunityInfoWithBanner from 'components/community/CommunityInfoWithBanner'
import GradientButton from 'components/common/GradientButton'
import Page from 'components/common/Page'
import PageLoading from 'components/common/PageLoading'
import TabPanel from 'components/common/TabPanel'
import AuthGuard from 'components/layout/AuthGuard'
import MembersTab from 'components/member/MembersTab'
import ProjectsTab from 'components/project/ProjectsTab'

import { useCommunity } from 'hooks/useCommunity'
import { useCommunityTokenHolding } from 'hooks/useHoldings'
import api from 'utils/api'
import { Member } from 'types'

export default function CommunityPage() {
  const [value, setValue] = useState(0)
  const router = useRouter()
  const { id, ref } = router.query

  const { data: community } = useCommunity(id)
  const holding = useCommunityTokenHolding(community)
  const { data: session } = useSession()
  const { data: account } = useAccount()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const isForefrontW3CR = ref === 'w3cr' && community?.ensDomain === 'ffdao.eth'

  useEffect(() => {
    if (community && holding && session && session.user && account) {
      if (isForefrontW3CR || holding.tokenHoldings >= community.minimumHoldingForMembership) {
        const { email, picture, profile } = session.user
        const { username, discriminator } = profile
        const discordHandle = `${username}#${discriminator}`
        const { address } = account

        api
          .post('members/check', {
            communityId: community.shortId,
            username,
            email,
            logoUrl: picture,
            discordHandle,
            address,
            isW3CR: isForefrontW3CR,
          })
          .then(({ data }) => {
            const { member } = data
            console.log(member)
          })
      }
    }
  }, [community, holding, session, account])

  if (!community || !holding) return <PageLoading />

  return (
    <AuthGuard>
      <Page title={`${community.name || 'Community'} | Member Directory | Forefront`}>
        {isForefrontW3CR || holding.tokenHoldings >= community.minimumHoldingForMembership ? (
          <Box>
            <CommunityInfoWithBanner community={community} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2} mx={4}>
              <Tabs value={value} onChange={handleTabChange} TabIndicatorProps={{ style: { background: '#606ACB' } }}>
                <Tab label={`Members (${community.members.length})`} />
                <Tab label="Projects" />
                <Tab label="Members Feed" disabled />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <MembersTab members={community.members} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ProjectsTab />
            </TabPanel>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '652px',
              margin: '100px auto',
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
                  You should hold at least {community.minimumHoldingForMembership} ${community.tokenInfo.symbol}. Visit
                  our marketplace to discover new communities, and swap to get access.
                </Typography>
              </Box>
              <Box mt={5}>
                <GradientButton href="https://forefront.market/market">FF Marketplace</GradientButton>
              </Box>
            </Box>
          </Box>
        )}
      </Page>
    </AuthGuard>
  )
}
