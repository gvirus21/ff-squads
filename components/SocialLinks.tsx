import { IconButton } from '@mui/material';
import Image from 'next/image';
import { SOCIAL_NAME_MAP } from '../config/constants';
import { SocialLink } from '../types';

export default function SocialLinks({ socialLinks }: { socialLinks: SocialLink }) {
  return (
    <>
      {Object.keys(socialLinks).map((key) => (
        <IconButton key={key}>
          <Image
            src={SOCIAL_NAME_MAP[key as keyof typeof SOCIAL_NAME_MAP].image}
            alt={SOCIAL_NAME_MAP[key as keyof typeof SOCIAL_NAME_MAP].label}
            width={20}
            height={20}
          />
        </IconButton>
      ))}
    </>
  );
}
