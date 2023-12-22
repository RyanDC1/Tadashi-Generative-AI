import { Button, message } from 'antd'
import { useChatContext } from '../../../contexts'

export default function RestartChatSetting() {

    const { clearChatHistory } = useChatContext()

    return (
        <Button
            danger
            type='primary'
            onClick={() => {
                clearChatHistory()
                .then(() => {
                    message.success("Chat History Cleared")
                })
                .catch(() => {
                    message.error("Cannot delete chat history while response is generating")
                })
            }}
        >
            Restart Chat
        </Button>
    )
}