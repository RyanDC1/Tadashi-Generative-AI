import { Button, message, Modal } from 'antd'
import { useChatContext } from '../../../contexts'

type Props = {
    onReset: () => void
}

export default function RestartChatSetting({ onReset }: Props) {

    const { clearChatHistory } = useChatContext()

    const [modal, modalContext] = Modal.useModal()

    return (
        <>
            {modalContext}
            <Button
                danger
                type='primary'
                onClick={() => {
                    modal.confirm({
                        title: 'Restart Chat?',
                        content: 'All chat history will be erased',
                        okButtonProps: {
                            danger: true
                        },
                        onOk: () => {
                            clearChatHistory()
                            .then(() => {
                                message.success("Chat History Cleared")
                                onReset()
                            })
                            .catch(() => {
                                message.error("Please wait, Cannot delete chat history while response is generating")
                            })
                        }
                    })
                }}
            >
                Restart Chat
            </Button>
        </>
    )
}