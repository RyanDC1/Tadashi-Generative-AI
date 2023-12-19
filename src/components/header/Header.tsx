import { Avatar, Button, Divider, Flex, Space, Typography, Switch } from 'antd'
import { SettingFilled } from '@ant-design/icons';
import { Palm2Icon, LightModeOutlined, DarkModeOutlined } from '../icons';
import { useTheme } from '../../contexts';
import { Theme } from '../../contexts/ThemeContext';

export default function Header() {

    const { theme, setTheme } = useTheme()

    return (
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
                            <Space size={8}>
                                TADASHI
                                <Typography.Text type='secondary'>
                                    <Divider type='vertical' />
                                    Powered by <Palm2Icon /> <b>PaLM 2</b>
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
                        />
                    </Space>
                </span>
            </Flex>
        </div>
    )
}