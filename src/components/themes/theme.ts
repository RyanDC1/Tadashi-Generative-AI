import { ConfigProviderProps } from "antd/es/config-provider";
import { theme as antTheme } from 'antd'

export const darkTheme: ConfigProviderProps['theme'] = {
    algorithm: antTheme.darkAlgorithm,
    components: {
        Input: {
            colorBgContainer: '#191919'
        },
        Card: {
            boxShadowCard: '-2px -2px 4px 1px rgb(21 122 212 / 21%), 0 3px 6px 0 rgba(175, 40, 193, 0.15), 4px -1px 12px 4px rgb(154 21 181 / 20%);'
        }
    }
}

export const lightTheme: ConfigProviderProps['theme'] = {
    algorithm: antTheme.defaultAlgorithm
}