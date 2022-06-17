import React from 'react'
import { Box } from '@mui/material'
import { SOCIAL_ICON_MAP } from 'config/constants'
import { SocialLink } from 'types'

export default function SocialLinks({
  socialLinks,
  size,
  type = 'normal',
}: {
  socialLinks: SocialLink
  size: number
  type?: string
}) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {socialLinks &&
        Object.keys(socialLinks).map((key) => {
          const { icon: IconComponent } = SOCIAL_ICON_MAP[key as keyof typeof SOCIAL_ICON_MAP]
          return (
            <Box
              key={key}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{
                height: '100%',
                mx: type === 'circle' ? '6px' : '1px',
              }}
            >
              <Box
                sx={{
                  background: type === 'circle' ? '#27282B' : 'transparent',
                  borderRadius: type === 'circle' ? '100%' : '2px',
                  p: type === 'circle' ? '6px' : '2px 5px',
                }}
              >
                <a
                  href={socialLinks[key as keyof SocialLink] as string}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <IconComponent
                    color="secondary"
                    sx={{
                      fontSize: `${size}px`,
                      py: 'auto',
                      display: 'flex',
                    }}
                  />
                </a>
              </Box>
            </Box>
          )
        })}
    </Box>
  )
}
