import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
    DARK = 'Dark',
    LIGHT = 'Light'
}

const ThemeSlice = createSlice({
    name: 'THEME_REDUCER',
    initialState: Theme.DARK,
    reducers: {
        setThemeAction: (state, action) => action.payload,
        setDarkModeAction: () => Theme.DARK,
        setLightModeAction: () => Theme.LIGHT,
        /**
         * @description determines the theme from system and applies it to the application
         */
        setSystemThemeAction: () => window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT
    }
})


export default ThemeSlice.reducer
export const { setThemeAction, setDarkModeAction, setLightModeAction, setSystemThemeAction } = ThemeSlice.actions