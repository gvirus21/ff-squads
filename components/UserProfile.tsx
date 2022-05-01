import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LaunchIcon from '@mui/icons-material/Launch';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Chip, Divider, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMemberInCommunity } from '../hooks/useMember';
import { shortenAddress } from '../utils';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const { deactivate, account } = useWeb3React();
  const { data: session } = useSession();
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deactivate();
    signOut();
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    router.push(`/community/${id}/member/edit`);
    setAnchorEl(null);
  };

  return (
      <Box display="flex">
          {member ? (
              <Box display="flex" sx={{ height: '24px', width: '24px', margin: '5px 10px'   }}>       
                      <Image
                          src={member.logoUrl ?? '/images/Profile.svg'}
                          alt={member.username}
                          width={24}
                          height={24}
                          style={{ borderRadius: '100%' , objectFit : 'fill' }}
                      />
              </Box>
          ) : (
                  <></>
              )}
 
      <Button variant="contained" color="primary" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        <AccountBalanceWalletIcon />
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#fff', ml: 1.5 }} />
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem>
          <Typography sx={{ marginRight: 2 }}>Metamask</Typography>
          <Chip label={shortenAddress(account)} />
          <IconButton sx={{ ml: 5 }}>
            <LaunchIcon fontSize="small" />
          </IconButton>
        </MenuItem>
        <Divider />
        {member ? (
          <>
            <MenuItem onClick={handleEditProfile}>
              <Image
                src={member.logoUrl ?? '/images/Profile.svg'}
                alt={member.username}
                width={28}
                height={28}
                style={{ borderRadius: '100%' }}
              />
              <Typography sx={{ marginLeft: 2 }}>{member.username}</Typography>
            </MenuItem>
            <Divider />
          </>
        ) : (
          <></>
        )}

        <MenuItem onClick={handleLogout}>
          <LogoutIcon color="error" />
          <Typography variant="body1" sx={{ ml: 1.5 }} color="error">
            Log out
          </Typography>
        </MenuItem>
      </Menu>
      </Box>
  );
}
