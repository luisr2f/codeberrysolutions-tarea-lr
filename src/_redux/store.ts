import { configureStore } from '@reduxjs/toolkit'

import popularReducer from '_redux/slices/popularSlice'
import genresReducer from '_redux/slices/genresSlice'

const store = configureStore({
  reducer: {
    popular: popularReducer,
    genres: genresReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
