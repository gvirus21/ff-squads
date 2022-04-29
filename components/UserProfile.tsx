import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LaunchIcon from '@mui/icons-material/Launch';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Chip, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { WEB3_CONNECTOR_KEY } from '../config/constants';
import { shortenAddress } from '../utils';

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { deactivate, account } = useWeb3React();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(WEB3_CONNECTOR_KEY);
    deactivate();
    signOut();
    setAnchorEl(null);
  };

  return (
    <>
      <AccountCircleOutlinedIcon />
      <Button variant="contained" color="primary" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        <AccountBalanceWalletIcon />
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#fff', ml: 1.5 }} />
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem>
          <Chip label={shortenAddress(account)} />
          <IconButton sx={{ ml: 5 }}>
            <LaunchIcon fontSize="small" />
          </IconButton>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon color="error" />
          <Typography variant="body1" sx={{ ml: 1.5 }} color="error">
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
