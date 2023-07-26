import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
// import { useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '_redux/hooks'

import { fetch as countryFetch } from '_redux/slices/popularSlice'

export default function Page() {
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const popular = useAppSelector((state) => state.popular)

  useEffect(() => {
    dispatch(countryFetch({ page: 1 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      <Box sx={{ my: 3, minHeight: 700 }}>
        <Box></Box>
        <Box sx={{ mt: 3 }}>
          <pre>
            <code>{JSON.stringify(popular, null, 4)}</code>
          </pre>
        </Box>
      </Box>
    </>
  )
}
