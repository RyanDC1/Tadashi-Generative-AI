import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useBrowserStore } from "."
import { useDispatch } from "react-redux"
import { BrowserStoreKeys } from ".."
import { StoreReducerType, Theme, setDarkMode, setLightMode, setSystemTheme, setTheme } from "../../store"

const useTheme = () => {

    const { addToStore } = useBrowserStore()

    const theme = useSelector<StoreReducerType, Theme>(s => s.themeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        // set global attribute, commonly used by third party libraries
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

export default useTheme