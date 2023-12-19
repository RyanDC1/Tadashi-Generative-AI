import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Button, Input, Space } from 'antd'
import { isEmpty } from 'lodash'
import { PromptHelpers, generateDyanmicPlaceholder } from '../../utils'
import { SendOutlined } from '@ant-design/icons'
import { TextAreaRef } from 'antd/es/input/TextArea'

type Props = {
    onSend: (value: string) => void,
    disabled?: boolean
}

export type PromptEditorRef = {
    focus: () => void
}

const PromptEditor = forwardRef<PromptEditorRef, Props>((props, ref) => {

    const { onSend, disabled = false } = props

    const [enableSend, setEnableSend] = useState(false)
    const [key, setKey] = useState(0)

    const inputRef = useRef<TextAreaRef>(null!)

    useImperativeHandle(ref, () => (
        {
            focus: () => inputRef.current.focus()
        }
    ), [])

    useEffect(() => {
        const typewriter = generateDyanmicPlaceholder({ id: 'chat-prompt', options: PromptHelpers })
        return () => {
            typewriter.stop()
        }
    }, [])

    return (
        <Space.Compact block className='prompt-container'>
            <Input.TextArea
                key={key}
                ref={inputRef}
                disabled={disabled}
                id='chat-prompt'
                autoFocus
                autoSize={{
                    minRows: 3,
                    maxRows: 5
                }}
                className='prompt-editor'
                placeholder={key > 0 ? undefined : `Ask Tadashi `}
                onChange={(event) => {
                    if (!isEmpty(event.target.value?.trim?.())) {
                        enableSend === false && setEnableSend(true)
                    }
                    else {
                        enableSend === true && setEnableSend(false)
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && event.shiftKey === false) {
                        //ignore if enterKey and shiftKey combination (new line)
                        sendPrompt()
                    }
                }}
            />
            <Button
                className='send-btn'
                type='primary'
                icon={<SendOutlined />}
                disabled={disabled || !enableSend}
                onClick={sendPrompt}
            />
        </Space.Compact>
    )

    function sendPrompt() {
        if (enableSend && !disabled) {
            onSend(inputRef.current.resizableTextArea.textArea.value.trim())
            setKey(key + 1)
        }
    }
})

export default PromptEditor