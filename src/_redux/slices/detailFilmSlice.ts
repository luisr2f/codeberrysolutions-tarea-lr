import axios from '_global/axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  loading: boolean
  result: any
  error: string
}

const initialState: InitialState = {
  loading: false,
  result: null,
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetch = createAsyncThunk(
  'detailFilm/fetch',
  async ({ id }: { id: number }) => {
    const params = {
      language: 'es'
    }
    return await axios
      .get('/movie/' + String(id), { params })
      .then((response) => response.data)
  }
)

const detailFilmSlice = createSlice({
  name: 'detailFilm',
  initialState,
  reducers: {
    reset: () => initialState
  },
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

export default detailFilmSlice.reducer

export const { reset } = detailFilmSlice.actions
