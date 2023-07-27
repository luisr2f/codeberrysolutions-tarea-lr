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
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'

import Link from '@mui/material/Link'

import Loading from 'components/loading'
import MessageTable from 'components/messageTable'
import ImageTmdb from 'components/imageTmdb'
import Genres from 'components/genres'
import DetailFIlm from 'components/detailFIlm'

import { useAppSelector, useAppDispatch } from '_redux/hooks'
import { fetch as popularFetch } from '_redux/slices/popularSlice'
import { fetch as genresFetch } from '_redux/slices/genresSlice'

import { TableRowStyled, TableCellStyled } from '_global/helperStyles'
import { auto } from '@popperjs/core'

import moment from 'moment'
import 'moment/locale/es'

export default function Page() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const data = useAppSelector((state) => state.popular)
  const genres = useAppSelector((state) => state.genres)

  const search = window.location.search
  const params = new URLSearchParams(search)
  const [page, setPage] = useState<number>(
    Number(params.get('page') !== null ? params.get('page') : 1)
  )
  const [detailId, setDetailId] = useState<number | null>(null)

  useEffect(() => {
    genres.result.length === 0 && dispatch(genresFetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

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
      <DetailFIlm id={detailId} onActionClose={() => setDetailId(null)} />
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
                Título / Género
              </TableCellStyled>
              <TableCellStyled sx={{ width: auto }}>
                Popularidad
              </TableCellStyled>
              <TableCellStyled sx={{ width: auto }}>
                Fecha de lanzamiento
              </TableCellStyled>
              <TableCellStyled sx={{ width: 120 }}></TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.loading && data.error !== '' ? (
              <MessageTable colSpan={5} text={data.error} />
            ) : null}
            {data.loading ? (
              <Loading colSpan={5} />
            ) : (
              <>
                {!data.loading &&
                  data.result?.results !== undefined &&
                  data.result?.results.length > 0 &&
                  data.result?.results.map((row, index) => (
                    <TableRowStyled key={index}>
                      <TableCell>
                        <Link
                          onClick={() => setDetailId(row.id)}
                          sx={{
                            cursor: 'pointer',
                            fontWeight: 'medium'
                          }}
                        >
                          <ImageTmdb
                            size={45}
                            img={row.poster_path}
                            title={row.title}
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ my: 1 }}>
                          <Link
                            underline="hover"
                            variant="body2"
                            onClick={() => setDetailId(row.id)}
                            sx={{
                              cursor: 'pointer',
                              fontWeight: 'medium'
                            }}
                          >
                            {row.title}
                          </Link>
                        </Box>
                        <Box>
                          <Genres
                            genre={row.genre_ids.map(
                              (id) =>
                                genres.result.find((elem) => elem.id === id)
                                  ?.name
                            )}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{row.popularity}</TableCell>
                      <TableCell>
                        {moment(row.release_date).format('D MMMM YYYY')}
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="flex-end"
                          alignItems="flex-start"
                        >
                          <IconButton
                            color="inherit"
                            onClick={() => {
                              setDetailId(row.id)
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRowStyled>
                  ))}
              </>
            )}
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
    </Box>
  )
}
