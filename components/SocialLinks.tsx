import { Box } from '@mui/material'
import { SOCIAL_ICON_MAP } from '../config/constants'
import { SocialLink } from '../types'

export default function SocialLinks({ socialLinks, _size }: { socialLinks: SocialLink; _size: number }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {socialLinks &&
        Object.keys(socialLinks).map((key) => {
          const { icon: IconComponent } = SOCIAL_ICON_MAP[key as keyof typeof SOCIAL_ICON_MAP]
          return (
            <a
              key={key}
              href={socialLinks[key as keyof SocialLink] as string}
              target="_blank"
              style={{ marginRight: 12 }}
              rel="noreferrer"
            >
              <IconComponent color="primary" sx={{ fontSize: `${_size}px` }} />
            </a>
          )
        })}
    </Box>
  )
}
