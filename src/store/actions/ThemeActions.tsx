import { Dispatch } from "react"
import { Theme, setThemeAction, setDarkModeAction, setLightModeAction, setSystemThemeAction } from "../reducers/ThemeReducer"

type x = typeof setThemeAction

export const setTheme = (theme: Theme) => (dispatch: Dispatch<any>) => dispatch(setThemeAction(theme))
export const setDarkMode = () => (dispatch: Dispatch<any>) => dispatch(setDarkModeAction())
export const setLightMode = () => (dispatch: Dispatch<any>) => dispatch(setLightModeAction())
export const setSystemTheme = () => (dispatch: Dispatch<any>) => dispatch(setSystemThemeAction())