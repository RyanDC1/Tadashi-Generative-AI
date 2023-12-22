import { Divider } from 'antd'
import RestartChatSetting from './RestartChatSetting'
import ChatModes from './ChatModes'

type Props = {}

export default function Settings({}: Props) {
  return (
    <div className='chat-settings'>
        <ChatModes/>

        <Divider/>

        <RestartChatSetting/>
    </div>
  )
}