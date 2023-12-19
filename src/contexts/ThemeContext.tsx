import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { BrowserStoreKeys, useBrowserStore } from '../utils'
import ThemeReducer from '../store/reducers/ThemeReducer'
import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { setDarkMode, setLightMode, setSystemTheme, setTheme } from '../store'

type Props = {
    children: React.ReactNode
}

type ThemeContextType = [Theme, Dispatch<UnknownAction>]

export enum Theme {
    DARK = 'Dark',
    LIGHT = 'Light'
}

const ThemeContext = createContext<ThemeContextType>(null!)

export default function ThemeContextProvider(props: Props) {

    const { getFromStore, addToStore } = useBrowserStore()
    const initialState: Theme = useMemo(() => {
        if (getFromStore(BrowserStoreKeys.THEME)) {
            return getFromStore(BrowserStoreKeys.THEME)
        }
        const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        return darkTheme.matches ? Theme.DARK : Theme.LIGHT
    }, [])
    const [theme, dispatch] = useReducer(ThemeReducer, initialState)

    useEffect(() => {
        addToStore(BrowserStoreKeys.THEME, initialState)
    }, [initialState])

    return (
        <ThemeContext.Provider value={[theme, dispatch]}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {

    const { addToStore } = useBrowserStore()
    const [theme, dispatch] = useContext(ThemeContext)

    useEffect(() => {
        // set global attribute, commanly used by third party libraries
        document.documentElement.setAttribute('data-color-mode', theme === Theme.DARK ? 'dark' : 'light')
        addToStore(BrowserStoreKeys.THEME, theme)
    }, [theme])

    return {
        theme,
        setTheme: (theme: Theme) => setTheme(theme)(dispatch),
        setDarkMode: () => setDarkMode()(dispatch),
        setLightMode: () => setLightMode()(dispatch),
        setSystemTheme: () => setSystemTheme()(dispatch)
    }
}