import { IconButton } from '@mui/material'
import { SOCIAL_ICON_MAP } from '../config/constants'
import { SocialLink } from '../types'

export default function SocialLinks({ socialLinks, _size }: { socialLinks: SocialLink, _size: number }) {
  return (
    <>
      {socialLinks &&
        Object.keys(socialLinks).map((key) => {
          const { icon: IconComponent } = SOCIAL_ICON_MAP[key as keyof typeof SOCIAL_ICON_MAP]
          return (
            <IconButton key={key} href={socialLinks[key as keyof SocialLink] as string} target="_blank" sx={{ mx: .8 }}>
                  <IconComponent color="primary" sx={{ fontSize: `${_size}px`}} />
            </IconButton>
          )
        })}
    </>
  )
}
