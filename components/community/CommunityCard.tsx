import React from 'react'
import { Box, Typography, Chip } from '@mui/material/'
import { useAccount } from 'wagmi'
import { Community } from 'types'
// import { useMemberVotesInACommunity } from 'hooks/useVotes'

interface CommunityProps {
  community: Community
  selected: boolean
  tokenHoldings?: number
}

export default function CommunityCard({ community, selected, tokenHoldings }: CommunityProps) {
  const { data } = useAccount()

  const [proposalsVotedInThisCommunity, setproposalsVotedInThisCommunity] = React.useState(0)

  // const { data: memberVotes } = useMemberVotesInACommunity(data?.address, community?.ensDomain)

  // React.useEffect(() => {
  //   let isCancelled = false

  //   if (!isCancelled) {
  //     if (memberVotes) {
  //       setproposalsVotedInThisCommunity(memberVotes.length)
  //     }
  //   }
  //   return () => {
  //     isCancelled = true
  //   }
  // }, [memberVotes])

  return (
    <Box
      sx={{
        width: 296,
        background: '#27282B',
        border: '1px solid #303236',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
        borderRadius: '12px',
        p: 3,
        cursor: 'pointer',
        ':hover': {
          border: '1px solid #8C79E2',
        },
        borderColor: selected ? '#8C79E2' : '#303236',
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="flex-start">
          <img
            src={community?.logoUrl ?? '/images/Profile.svg'}
            alt={community?.name}
            width={48}
            height={48}
            style={{ borderRadius: '100%' }}
          />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-start">
          <Typography
            sx={{
              fontSize: '20px',
              lineheight: '24px',
              fontWeight: 400,
              mt: 2,
            }}
          >
            {community?.name}
          </Typography>
        </Box>
        <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-start">
          <Box>
            <Chip
              label="Tokenholder"
              sx={{
                px: 1.5,
                py: 0,
                fontSize: '14px',
                fontWeight: 400,
                my: 0.5,
                background: '#373737',
                borderRadius: '4px',
              }}
            />
            <Chip
              label={`${tokenHoldings} $${community?.tokenInfo?.symbol}`}
              sx={{
                px: 1.5,
                py: 0,
                fontSize: '14px',
                fontWeight: 400,
                my: 0.5,
                ml: 2,
                background: '#373737',
                borderRadius: '4px',
                textTransform: 'uppercase',
              }}
            />
            <Chip
              label={`${proposalsVotedInThisCommunity}  Votes`}
              sx={{
                px: 1.5,
                py: 0,
                fontSize: '14px',
                fontWeight: 400,
                my: 0.5,
                background: '#373737',
                borderRadius: '4px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
