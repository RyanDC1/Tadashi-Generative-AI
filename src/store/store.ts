import { configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './reducers/ThemeReducer'
import ConfigReducer from './reducers/ConfigReducer'
import { useDispatch as useReduxDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    themeReducer: ThemeReducer,
    configReducer: ConfigReducer
  }
})

export default store
export type StoreDispatchType = typeof store.dispatch
export const useDispatch: () => StoreDispatchType = useReduxDispatch
export type StoreReducerType = ReturnType<typeof store.getState>