import React from 'react'
import { TableCell, Grid, Typography, TableRow } from '@mui/material'

interface Props {
  colSpan: number
  text?: string
}

const Component: React.FC<Props> = ({
  colSpan,
  text = 'No existen resultados'
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ py: 2 }}
        >
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ textAlign: 'center', py: 1, color: 'grey.400' }}
          >
            {text}
          </Typography>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default Component
