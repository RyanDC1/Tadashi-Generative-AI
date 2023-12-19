import { configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './reducers/ThemeReducer'

export default configureStore({
  reducer: ThemeReducer
})