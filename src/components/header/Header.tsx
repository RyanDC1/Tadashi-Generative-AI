import { Avatar, Button, Divider, Flex, Space, Typography, Switch } from 'antd'
import { SettingFilled } from '@ant-design/icons';
import { LightModeOutlined, DarkModeOutlined } from '../icons';
import { useTheme } from '../../utils';
import { SettingsDrawer } from './settings';
import { useState } from 'react';
import { Theme } from '../../store';

export default function Header() {

    const { theme, setTheme } = useTheme()

    const [showSettings, setShowSettings] = useState(false)

    return (
        <>
            <div className='header sticky-header'>
                <Flex justify='space-between' className='header-content'>
                    <span>
                        <Space className='header-title-container'>
                            <Avatar
                                shape='square'
                                size='large'
                                src={<img src='/images/logo.png' />}
                            />
                            <Typography.Title className='header-title'>
                                <Space size={2} className='title'>
                                    TADASHI
                                    <Typography.Text type='secondary' className='title-description'>
                                        <Divider type='vertical' />
                                        Powered by Gemini
                                    </Typography.Text>
                                </Space>
                            </Typography.Title>
                        </Space>
                    </span>
                    <span>
                        <Space size={24}>
                            <Switch
                                title='Theme'
                                className='mb-4'
                                checked={theme === Theme.DARK}
                                onChange={(checked) => {
                                    setTheme(checked ? Theme.DARK : Theme.LIGHT)
                                }}
                                checkedChildren={
                                    <DarkModeOutlined/>
                                }
                                unCheckedChildren={
                                    <LightModeOutlined/>
                                }
                            />
                            <Button
                                title='Settings'
                                size='large'
                                icon={<SettingFilled />}
                                type='text'
                                className='settings-icon btn-icon'
                                onClick={() => setShowSettings(true)}
                            />
                        </Space>
                    </span>
                </Flex>
            </div>

            <SettingsDrawer
                open={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </>
    )
}