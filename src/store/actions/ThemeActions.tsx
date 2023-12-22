import { Theme, setThemeAction, setDarkModeAction, setLightModeAction, setSystemThemeAction } from "../reducers/ThemeReducer"
import { StoreDispatchType } from "../store"

export const setTheme = (theme: Theme) => (dispatch: StoreDispatchType) => dispatch(setThemeAction(theme))
export const setDarkMode = () => (dispatch: StoreDispatchType) => dispatch(setDarkModeAction(undefined))
export const setLightMode = () => (dispatch: StoreDispatchType) => dispatch(setLightModeAction(undefined))
export const setSystemTheme = () => (dispatch: StoreDispatchType) => dispatch(setSystemThemeAction(undefined))