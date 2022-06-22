import { Box, Typography, CardMedia } from '@mui/material'

type ModalProp = {
  thumbnail?: string
  projectTitle?: string
  profileImage?: string
  userName?: string
  openToCollab?: boolean
  tags?: string[]
}

function ProjectDetailsModal({ thumbnail, projectTitle, profileImage, userName, openToCollab, tags }: ModalProp) {
  return (
    <Box
      sx={{
        background: '#1F2023',
        borderRadius: '12px',
        height: '735px',
        width: '1034px',
        zIndex: 999999,
      }}
    >
      <Box>
        <CardMedia component="img" src={thumbnail} />
      </Box>
      <Box>
        <Typography>{projectTitle}</Typography>
      </Box>
      <Box>
        <CardMedia component="img" src={profileImage} />
        <Typography>{userName}</Typography>
      </Box>
      <Box>
        {/* tags */}
        <Box>
          {tags?.map((tag: string, index: number) => {
            return (
              <Box key={index}>
                <Typography>{tag}</Typography>
              </Box>
            )
          })}
        </Box>

        {/* buttons */}
        <Box>
          {openToCollab && <Box>Connect to collab</Box>}

          <Box>Follow</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectDetailsModal
