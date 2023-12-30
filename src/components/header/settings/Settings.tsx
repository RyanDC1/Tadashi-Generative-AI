import { Divider } from 'antd'
import RestartChatSetting from './RestartChatSetting'
import ChatModes from './ChatModes'

type Props = {
  onReset: () => void
}

export default function Settings({ onReset }: Props) {
  return (
    <div className='chat-settings'>
        <ChatModes/>

        <Divider/>

        <RestartChatSetting 
          onReset={onReset}
        />
    </div>
  )
}