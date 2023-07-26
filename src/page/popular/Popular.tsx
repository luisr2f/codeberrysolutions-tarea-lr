import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination'

import Loading from 'components/loading'
import MessageTable from 'components/messageTable'
import ImageTmdb from 'components/imageTmdb'

import { useAppSelector, useAppDispatch } from '_redux/hooks'
import { fetch as popularFetch } from '_redux/slices/popularSlice'
import { TableRowStyled, TableCellStyled } from '_global/helperStyles'
import { auto } from '@popperjs/core'

import moment from 'moment'
import 'moment/locale/es'

export default function Page() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const data = useAppSelector((state) => state.popular)

  const search = window.location.search
  const params = new URLSearchParams(search)
  // params.get('page')
  const [page, setPage] = useState<number>(
    Number(params.get('page') !== null ? params.get('page') : 1)
  )

  /* useEffect(() => {
    dispatch(popularFetch({ page: 1 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  */

  useEffect(() => {
    navigate({
      pathname: '/popular',
      search: '?page=' + String(page)
    })
    dispatch(popularFetch({ page }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          size="small"
          style={{ width: '100%' }}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCellStyled sx={{ width: 50 }}></TableCellStyled>
              <TableCellStyled sx={{ width: auto }}>
                Título / Fecha de lanzamiento
              </TableCellStyled>
              <TableCellStyled sx={{ width: auto }}>
                Popularidad
              </TableCellStyled>
              <TableCellStyled sx={{ width: auto }}>Género</TableCellStyled>
              <TableCellStyled sx={{ width: 120 }}></TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.loading && <Loading colSpan={3} />}
            {!data.loading && data.error !== '' ? (
              <MessageTable colSpan={3} text={data.error} />
            ) : null}
            {!data.loading &&
              data.result?.results !== undefined &&
              data.result?.results.length > 0 &&
              data.result?.results.map((row, index) => (
                <TableRowStyled key={index}>
                  <TableCell>
                    <ImageTmdb
                      size={45}
                      img={row.poster_path}
                      title={row.title}
                    />
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.popularity}</TableCell>
                  <TableCell>
                    {moment(row.release_date).format('D MMMM YYYY')}
                  </TableCell>
                  <TableCell> z</TableCell>
                </TableRowStyled>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.result?.total_pages !== undefined && (
        <Pagination
          // count={data.result?.total_pages} // limit
          count={500}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ my: 2 }}
          color="primary"
          showFirstButton
          showLastButton
        />
      )}
      {/* <Box sx={{ mt: 3 }}>
        <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
      </Box> */}
    </Box>
  )
}
