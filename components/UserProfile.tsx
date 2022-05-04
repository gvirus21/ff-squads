import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import LaunchIcon from '@mui/icons-material/Launch'
import LogoutIcon from '@mui/icons-material/Logout'
import { Box, Chip, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMemberInCommunity } from '../hooks/useMember'
import { shortenAddress } from '../utils'
import UserIcon from './icons/UserIcon'

const UserAvatarIcon = ({ member }: { member: any }) => {
  if (member) {
    return (
      <Image
        src={member.logoUrl ?? '/images/Profile.svg'}
        alt={member.username}
        width={28}
        height={28}
        style={{ borderRadius: '100%' }}
      />
    )
  }

  return <UserIcon htmlColor="#BAC3B9" />
}

export default function UserProfile() {
  const router = useRouter()
  const { id } = router.query
  const [anchorEl, setAnchorEl] = useState(null)
  const { deactivate, account } = useWeb3React()
  const { data: session } = useSession()
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  )

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    deactivate()
    signOut()
    setAnchorEl(null)
  }

  const handleEditProfile = () => {
    router.push(`/community/${id}/member-edit`)
    setAnchorEl(null)
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        {member && <UserAvatarIcon member={member} />}
        <IconButton color="secondary" onClick={handleClick} sx={{ ml: 2 }}>
          <AccountBalanceWalletIcon />
        </IconButton>
      </Box>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem>
          <Typography sx={{ marginRight: 2 }}>Metamask</Typography>
          <Chip label={shortenAddress(account)} />
          <IconButton sx={{ ml: 5 }}>
            <LaunchIcon fontSize="small" />
          </IconButton>
        </MenuItem>
        <Divider />
        {member && (
          <>
            <MenuItem onClick={handleEditProfile}>
              <UserAvatarIcon member={member} />
              <Typography sx={{ marginLeft: 2 }}>{member.username}</Typography>
            </MenuItem>
            <Divider />
          </>
        )}
        <MenuItem onClick={handleLogout}>
          <LogoutIcon color="error" />
          <Typography variant="body1" sx={{ ml: 1.5 }} color="error">
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
