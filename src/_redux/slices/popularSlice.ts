import axios from '_global/axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  loading: boolean
  result: null | Result
  error: string
}

interface Result {
  page: number
  results: any[]
  total_pages: number
  total_results: number
}
const initialState: InitialState = {
  loading: false,
  result: null,
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetch = createAsyncThunk(
  'country/fetch',
  async ({ page }: { page: number }) => {
    const params = {
      page,
      language: 'es'
    }
    return await axios
      .get('/movie/popular', { params })
      .then((response) => response.data)
  }
)

const countrySlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetch.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.result = action.payload
      state.error = ''
    })
    builder.addCase(fetch.rejected, (state, action) => {
      state.loading = false
      state.result = null
      state.error = action.error.message ?? 'Something went wrong'
    })
  }
})

export default countrySlice.reducer
