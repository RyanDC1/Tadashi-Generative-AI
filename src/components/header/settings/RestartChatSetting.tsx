import { Button, message, Modal } from 'antd'
import { useChatContext } from '../../../contexts'

type Props = {
    onReset: () => void
}

export default function RestartChatSetting({ onReset }: Props) {

    const { clearChatHistory } = useChatContext()

    const [modal, modalContext] = Modal.useModal()
    const [toast, toastContext] = message.useMessage()

    return (
        <>
            {modalContext}
            {toastContext}
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
                                toast.success("Chat History Cleared")
                                onReset()
                            })
                            .catch(() => {
                                toast.error("Please wait, Cannot delete chat history while response is generating")
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