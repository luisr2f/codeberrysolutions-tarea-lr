import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Paper, CardActionArea } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '_redux/hooks'

import Loading from 'components/loading/Loading'
import DetailFIlm from 'components/detailFIlm'

import { fetch as countryFetch } from '_redux/slices/popularSlice'
import { urlImgs } from '_global/constant'

export default function LastRquest() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const data = useAppSelector((state) => state.popular)

  const [detailId, setDetailId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(countryFetch({ page: 1 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <Paper sx={{ p: 2 }}>
      <DetailFIlm id={detailId} onActionClose={() => setDetailId(null)} />
      <Typography variant="h5" gutterBottom sx={{ mx: 2 }}>
        Top Películas más populares
      </Typography>

      {data.loading ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {!data.loading &&
              data.result?.results !== undefined &&
              data.result?.results.length > 0 &&
              data.result?.results.slice(0, 3).map((row, index) => (
                <Grid item key={index}>
                  <Card sx={{ width: 340 }}>
                    <CardActionArea onClick={() => setDetailId(row.id)}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${urlImgs}t/p/w342/${String(
                          row?.backdrop_path
                        )}`}
                        alt=""
                      />
                      <CardContent sx={{ minHeight: 190 }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {row.title}
                        </Typography>
                        <Typography
                          sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3
                          }}
                          variant="body2"
                          color="text.secondary"
                        >
                          {row.overview}
                        </Typography>
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            p: 1,
                            px: 2
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: 'grey.700' }}
                          >
                            {row.popularity}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Box sx={{ mx: 2, mt: 1 }}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate(`/popular`)}
            >
              Ver listado de películas más populares
            </Button>
          </Box>
        </>
      )}
    </Paper>
  )
}
