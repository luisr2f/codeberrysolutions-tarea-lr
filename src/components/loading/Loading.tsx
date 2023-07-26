import React from 'react'
import { TableCell, Grid, CircularProgress, TableRow, Box } from '@mui/material'

interface Props {
  colSpan?: number
}

const Loading: React.FC<Props> = ({ colSpan = undefined }) => {
  if (colSpan === undefined) {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ my: 2 }}
      >
        <CircularProgress size={28} sx={{ color: 'grey.400' }} />
      </Box>
    )
  }

  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ py: 4 }}
        >
          <CircularProgress size={28} sx={{ color: 'grey.400' }} />
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default Loading
