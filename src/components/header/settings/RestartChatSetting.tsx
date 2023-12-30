import { Button, message } from 'antd'
import { useChatContext } from '../../../contexts'

type Props = {
    onReset: () => void
}

export default function RestartChatSetting({ onReset }: Props) {

    const { clearChatHistory } = useChatContext()

    return (
        <Button
            danger
            type='primary'
            onClick={() => {
                clearChatHistory()
                .then(() => {
                    message.success("Chat History Cleared")
                    onReset()
                })
                .catch(() => {
                    message.error("Please wait, Cannot delete chat history while response is generating")
                })
            }}
        >
            Restart Chat
        </Button>
    )
}