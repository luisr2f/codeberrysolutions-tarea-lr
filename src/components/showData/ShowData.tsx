import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface Props {
  type?: 'simple' | 'title' | 'table'
  field?: string
  data?: string | string[]
  title?: string
  tableField?: string[]
  tableData?: string[][]
  width?: number
}

const ShowData: React.FC<Props> = ({
  field = '',
  data = '',
  title = '',
  type = 'simple',
  tableField = [],
  tableData = [],
  width = 200
}) => {
  if (type === 'title') {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ my: 0.5 }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500, ml: 2 }}>
          {data}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ my: 0.7 }}
    >
      <Box
        sx={{
          width,
          flexShrink: 0,
          textAlign: 'right'
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {field}
          {field !== '' && ':'}
        </Typography>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'grey.300',
          mx: 0.5,
          width: '100%'
        }}
      >
        {type === 'simple' && data !== null && (
          <>
            {typeof data === 'string' || data instanceof String ? (
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {data === '' ? '-' : data}
              </Typography>
            ) : (
              <Box sx={{ ml: 0.5 }}>
                {data.map((row, index) => (
                  <Typography variant="body2" key={index}>
                    - {row}
                  </Typography>
                ))}
              </Box>
            )}
          </>
        )}
        {type === 'table' && (
          <>
            <TableContainer
              sx={{
                border: 1,
                borderColor: 'grey.200',
                borderRadius: 1
              }}
            >
              <Table sx={{}} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {tableField.map((row, index) => (
                      <TableCell key={index}>{row}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0
                        }
                      }}
                    >
                      {tableField.map((_, k) => (
                        <TableCell key={index}>
                          <Typography variant="body2">{row[k]}</Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ShowData
