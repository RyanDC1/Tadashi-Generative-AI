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
    focus: () => void,
    setValue: (value: string) => void
}

enum InputMode {
    Touch = 'touch',
    Mouse = 'mouse'
}

const PromptEditor = forwardRef<PromptEditorRef, Props>((props, ref) => {

    const { onSend, disabled = false } = props

    const [enableSend, setEnableSend] = useState(false)
    const [controlledValue, setControlledValue] = useState(undefined)
    const [inputMode, setInputMode] = useState<PointerEvent['pointerType']>(InputMode.Mouse)
    const [key, setKey] = useState(0)

    const inputRef = useRef<TextAreaRef>(null!)

    useImperativeHandle(ref, () => (
        {
            focus: () => {
                // Input will only be focused if user is using a mouse input
                // to prevent keypad from popping up on focus on touch devices
                inputMode === InputMode.Mouse && inputRef.current.focus()
            },
            setValue: (value: string) => {
                setControlledValue(value)
                inputRef.current.focus()
                if(!isEmpty(value?.trim?.()))
                {
                    setEnableSend(true)
                }
            }
        }
    ), [inputMode])

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
                translate='no'
                disabled={disabled}
                id='chat-prompt'
                autoFocus
                autoSize={{
                    minRows: 3,
                    maxRows: 5
                }}
                onClick={(event) => {
                    const pointerEvent = event.nativeEvent as PointerEvent
                    if(inputMode !== pointerEvent?.pointerType)
                    {
                        setInputMode(pointerEvent.pointerType)
                    }
                }}
                className='prompt-editor'
                placeholder={key > 0 ? undefined : `Ask Tadashi `}
                onChange={(event) => {
                    if(controlledValue !== undefined)
                    {
                        // set value only when in controlled state to avoid re-renders
                        setControlledValue(event.target.value || undefined)
                    }
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
                value={controlledValue}
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
            setControlledValue(undefined)
            setEnableSend(false)
            setKey(key + 1)
        }
    }
})

export default PromptEditor