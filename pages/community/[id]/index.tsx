import { Box, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import CommunityInfoWithBanner from 'components/community/CommunityInfoWithBanner'
import Page from 'components/common/Page'
import PageLoading from 'components/common/PageLoading'
import TabPanel from 'components/common/TabPanel'
import AuthGuard from 'components/layout/AuthGuard'
import MembersTab from 'components/member/MembersTab'
import ProjectsTab from 'components/project/ProjectsTab'

import { useCommunity } from 'hooks/useCommunity'

export default function CommunityPage() {
  const [value, setValue] = React.useState(0)
  const router = useRouter()
  const { id } = router.query

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { data: community } = useCommunity(id)

  if (!community) return <PageLoading />

  return (
    <AuthGuard>
      <Page title={`${community.name || 'Community'} | Member Directory | Forefront`}>
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
      </Page>
    </AuthGuard>
  )
}
