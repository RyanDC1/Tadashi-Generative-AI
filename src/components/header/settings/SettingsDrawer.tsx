import { SettingOutlined } from '@ant-design/icons'
import { Drawer, Space, Typography } from 'antd'
import Settings from './Settings'
import { useTheme } from '../../../utils'
import { Theme } from '../../../store'

type Props = {
    open: boolean,
    onClose: () => void
}

export default function SettingsDrawer(props: Props) {

    const { open, onClose } = props

    const { theme } = useTheme()

    return (
        <Drawer
            className='settings-drawer'
            rootClassName={theme === Theme.DARK ? 'dark-mode-drawer' : ''}
            open={open}
            getContainer={() => document.getElementById('main-layout')}
            title={
                <Space>
                    <SettingOutlined />
                    Settings
                </Space>
            }
            size='large'
            destroyOnClose
            onClose={onClose}
        >
            <Settings 
                onReset={onClose}
            />
        </Drawer>
    )

}