import React from 'react'
import { ConfigProvider, Layout } from 'antd'
import { Theme, useTheme } from '../../contexts/ThemeContext'
import { darkTheme, lightTheme } from '../themes/theme'

const { Content, Header } = Layout

type Props = {
    header: JSX.Element,
    children: React.ReactNode
}

export default function MainLayout(props: Props) {

    const { header, children } = props

    const { theme } = useTheme()
    console.log(theme)

    return (
        <ConfigProvider
            theme={
                theme === Theme.DARK ?
                    darkTheme
                    :
                    lightTheme
            }
        >
            <Layout className={'main-layout'.concat(theme === Theme.DARK ? ' dark-mode' : '')}>
                <Header className='layout-header'>
                    {header}
                </Header>
                <Content className='layout-content'>
                    {children}
                </Content>
            </Layout>
        </ConfigProvider>
    )
}