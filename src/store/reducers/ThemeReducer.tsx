import { PayloadAction, SliceCaseReducers, SliceSelectors, createSlice } from "@reduxjs/toolkit";
import { BrowserStoreKeys } from "../../utils";

export enum Theme {
    DARK = 'Dark',
    LIGHT = 'Light'
}

let initialState = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT
if (localStorage.getItem(BrowserStoreKeys.THEME)) {
    try {
        initialState = JSON.parse(localStorage.getItem(BrowserStoreKeys.THEME)) as Theme
    } catch (error) {
        console.error(error)
    }
}

const ThemeSlice = createSlice<Theme, SliceCaseReducers<Theme>, string, SliceSelectors<Theme>, string>({
    name: 'THEME_REDUCER',
    initialState: initialState,
    reducers: {
        setThemeAction: (_state, action: PayloadAction<Theme>) => action.payload,
        setDarkModeAction: (_state) => Theme.DARK,
        setLightModeAction: (_state) => Theme.LIGHT,
        /**
         * @description determines the theme from system and applies it to the application
         */
        setSystemThemeAction: () => window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT
    }
})


export default ThemeSlice.reducer
export const { setThemeAction, setDarkModeAction, setLightModeAction, setSystemThemeAction } = ThemeSlice.actions