import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
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
import ListItemButton from '@mui/material/ListItemButton';

import List from '@mui/material/List';
 
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function UserProfileMobile() {
  const router = useRouter();
  const { id } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const { deactivate, account } = useWeb3React();
  const { data: session } = useSession();
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  );




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

          <List>
              
                  <ListItem>
                      <ListItemIcon>
                        <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Wallet"} sx={{ fontSize: '16px', fontWeight : 300 }} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                      <ListItemIcon>
                        
                      </ListItemIcon>
                      <ListItemText primary={"Metamask"} sx={{ fontSize: '16px', fontWeight: 300 }}/>
                     <Chip
                      label={shortenAddress(account)}
                      sx={{ background: '#E5ECE3', opacity: 0.8, boxShadow: '0px 3.17565px 3.17565px rgba(0, 0, 0, 0.25)', borderRadius: '10.0767px', fontSize: '12px', fontWeight: 300, color: '#616D6C' , margin : 'auto 10px' , padding : 0 }}
                     />
                      <IconButton sx={{ ml: 5 }}>
                          <LaunchIcon fontSize="small" />
                      </IconButton>
                  </ListItem>
                  <Divider />
                  <ListItem>
                      <ListItemIcon>
                          {member ? (
                              <Box display="flex" sx={{ height: '24px', width: '24px', margin: '5px 0px' }}>
                                  <Image
                                      src={member.logoUrl ?? '/images/Profile.svg'}
                                      alt={member.username}
                                      width={24}
                                      height={24}
                                      style={{ borderRadius: '100%', objectFit: 'fill' }}
                                  />
                              </Box>
                          ) : (
                                  <></>
                              )}
                      </ListItemIcon>
                      <ListItemText primary={member?.username} sx={{ fontSize: '16px', fontWeight: 300 }}/>
                       
                  </ListItem>
                  <Divider />
                 <ListItemButton onClick={() => { handleLogout() }}>
                      <ListItemIcon>
                        <LogoutIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary={"Log out"} sx={{ fontSize: '16px', fontWeight: 300 }}/>

                  </ListItemButton>
                  <Divider />
            </List>


           
 
       
    
      </Box>
  );
}
