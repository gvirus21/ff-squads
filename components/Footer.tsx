import { AppBar, Box, Toolbar, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import UserProfile from './UserProfile';

 

export default function Footer() {
   

    return (
        <Grid sx={{ background: "#0F1F20", position: "fixed", bottom: "0", width: "100vw", color: "#FCFDF0",    }}>
            <Grid sx={{ m: "1rem 2rem" }}>
            <Box sx={{ display: 'flex', flex: "1" }}   >
                    <Box sx={{ fontFamily: 'SoraRegular'} }> JOIN US </Box>
                    <Box sx={{ margin: ".2rem .8rem", filter: "brightness(0) invert(1)"}} >
                        <Image src="/images/Discord.svg" width={20} height={17} alt="logo" />
                    </Box>
                    <Box sx={{ margin: ".2rem .8rem", filter: "brightness(0) invert(1)" }} >
                        <Image src="/images/Twitter.svg" width={20} height={17} alt="logo" />
                    </Box>
                    <Box sx={{ margin: ".2rem .8rem", filter: "brightness(0) invert(1)" }} >
                        <Image src="/images/Mirror.svg" width={20} height={17} alt="logo" />
                    </Box>
                </Box>
                <Box  >
                    <Box sx={{ color:"#BAC3B9"}}> Value. Culture. Community </Box>
                 </Box>
                </Grid>
        </Grid>
  );
}
