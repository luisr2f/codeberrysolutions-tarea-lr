import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import ImageTmdb from 'components/imageTmdb'
import ShowData from 'components/showData'
import Genres from 'components/genres'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { Box } from '@mui/material'

import moment from 'moment'
import 'moment/locale/es'

import { useAppSelector, useAppDispatch } from '_redux/hooks'
import { fetch as detailFilmFetch, reset } from '_redux/slices/detailFilmSlice'
import Loading from 'components/loading/Loading'

interface Props {
  id: number | null
  onActionClose: () => void
}

const Comp: React.FC<Props> = ({ id, onActionClose }) => {
  const dispatch = useAppDispatch()

  const data = useAppSelector((state) => state.detailFilm)
  const info = useAppSelector((state) => state.detailFilm.result)

  // const dispatch = useAppDispatch()

  useEffect(() => {
    if (Number.isInteger(id) && id !== null) {
      dispatch(reset())
      dispatch(detailFilmFetch({ id }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Dialog
        open={id !== null}
        maxWidth={'md'}
        fullWidth={true}
        onClose={() => onActionClose()}
      >
        <DialogTitle sx={{ p: 0, m: 0 }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              borderBottom: 1,
              borderColor: 'grey.300',
              p: 1,
              px: 2,
              minHeight: 40
            }}
          >
            <Box>{info?.title}</Box>
          </Box>

          <IconButton
            aria-label="close"
            onClick={() => onActionClose()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 4,
              color: (theme) => theme.palette.grey[700]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ minHeight: 500, pt: 0 }}>
          {data.loading ? (
            <Box sx={{ py: 5 }}>
              <Loading />
            </Box>
          ) : (
            <>
              {info?.title !== undefined && (
                <>
                  <Grid container sx={{ py: 1 }}>
                    <Grid item xs={3}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        sx={{ pt: 2 }}
                      >
                        <ImageTmdb
                          size={185}
                          img={info?.poster_path}
                          title={info?.title}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={9} sx={{ pl: 2 }}>
                      <>
                        {info?.overview !== undefined &&
                          info?.overview !== '' && (
                            <Box sx={{ my: 2 }}>
                              <ShowData type="title" data="Descripción" />
                              <Typography
                                variant="body2"
                                display="block"
                                gutterBottom
                              >
                                {info?.overview}
                              </Typography>
                            </Box>
                          )}
                        <Box sx={{ my: 2 }}>
                          <ShowData type="title" data="Género" />

                          <Genres
                            genre={info?.genres.map((item) => item?.name)}
                          />
                        </Box>
                        <ShowData
                          field="Nombre oficial"
                          data={info?.original_title}
                        />
                        <ShowData
                          field="Fecha de lanzamiento"
                          data={moment(info?.release_date).format(
                            'D MMMM YYYY'
                          )}
                        />
                        {info?.production_countries !== undefined &&
                          info?.production_countries.length > 0 && (
                            <ShowData
                              field="Países productores"
                              data={info?.production_countries.map(
                                (item) => item.name
                              )}
                            />
                          )}
                        <ShowData
                          field="Lenguaje original"
                          data={
                            info?.spoken_languages.find(
                              (item) =>
                                item.iso_639_1 === info?.original_language
                            )?.name
                          }
                        />
                        <ShowData
                          field="Lenguaje disponibles"
                          data={info?.spoken_languages.map((item) => item.name)}
                        />

                        <Box sx={{ my: 2 }}>
                          <ShowData
                            field="Popularidad"
                            data={String(info?.popularity)}
                          />
                          <ShowData
                            field="Voto promedio"
                            data={String(info?.vote_average)}
                          />
                          <ShowData
                            field="Total de votos"
                            data={String(info?.vote_count)}
                          />
                        </Box>
                        {info?.production_companies.length > 0 && (
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-start"
                          >
                            {info?.production_companies.map((row, index) => (
                              <Box key={index} sx={{ mr: 2 }}>
                                <ImageTmdb
                                  size={92}
                                  img={row?.logo_path}
                                  title={row.name}
                                />
                              </Box>
                            ))}
                          </Box>
                        )}
                      </>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Comp
