import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import AuthGuard from '../../../components/AuthGuard';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import CommunityProfileForm from '../../../components/CommunityProfileForm';
import Image from 'next/image';


const CommunityEditPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <AuthGuard>

            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={20} >
                <Box sx={{   }}>
                    <Card sx={{ overflow: 'visible', background: '#FCFDF0', boxShadow: '2px 10px 45px #E5ECE3' }}>
                        <CardHeader avatar={<CommunityIcon />} title="Edit Community Profile" titleTypographyProps={{ variant: 'h6', color: '#4AAA7B' }} />
                        <CardContent sx={{ padding: 4 }}>
                            <CommunityProfileForm   />
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </AuthGuard>
    );
};

export default CommunityEditPage;


const CommunityIcon = () => {
    return (
        <Box>
            <Image src="/images/EditCommunityIcon.svg" width={20} height={17} alt="logo" />
        </Box>
    )
}