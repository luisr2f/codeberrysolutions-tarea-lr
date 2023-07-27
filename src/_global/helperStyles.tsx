import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Col from '_global/color'

export const TableRowStyled = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[900]
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Col.identityPrimary
    // color: theme.palette.common.white
  }
  /* [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  } */
}))
