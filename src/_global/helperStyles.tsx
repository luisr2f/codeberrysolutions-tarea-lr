import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

export const TableRowStyled = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[200]
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[500]
    // color: theme.palette.common.white
  }
  /* [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  } */
}))
