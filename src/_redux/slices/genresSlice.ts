import axios from '_global/axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  loading: boolean
  result: any[]
  error: string
}
export interface Data {
  id: number
  name: string
}

const initialState: InitialState = {
  loading: false,
  result: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetch = createAsyncThunk('genres/fetch', async () => {
  const params = {
    language: 'es'
  }
  return await axios
    .get('/genre/movie/list', { params })
    .then((response) => response.data.genres)
})

const countrySlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetch.fulfilled, (state, action: PayloadAction<Data[]>) => {
      state.loading = false
      state.result = action.payload

      state.error = ''
    })
    builder.addCase(fetch.rejected, (state, action) => {
      state.loading = false
      state.result = []
      state.error = action.error.message ?? 'Something went wrong'
    })
  }
})

export default countrySlice.reducer
