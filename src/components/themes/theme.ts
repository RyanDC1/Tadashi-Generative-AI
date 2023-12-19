import { ConfigProviderProps } from "antd/es/config-provider";
import { theme as antTheme } from 'antd'

export const darkTheme: ConfigProviderProps['theme'] = {
    algorithm: antTheme.darkAlgorithm,
    components: {
        Input: {
            colorBgContainer: '#1f1f1f'
        }
    }
}

export const lightTheme: ConfigProviderProps['theme'] = {
    algorithm: antTheme.defaultAlgorithm
}