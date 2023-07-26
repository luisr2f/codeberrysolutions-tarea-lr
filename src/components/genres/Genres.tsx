import React from 'react'
import { Box } from '@mui/material'
import Chip from '@mui/material/Chip'

interface Props {
  genre: string[]
}

const Comp: React.FC<Props> = ({ genre }) => {
  return (
    <Box sx={{ ml: -0.3 }}>
      {genre.map((row, index) => (
        <Chip
          key={index}
          label={row}
          variant="outlined"
          sx={{ m: 0.3 }}
          size="small"
        />
      ))}
    </Box>
  )
}

export default Comp
