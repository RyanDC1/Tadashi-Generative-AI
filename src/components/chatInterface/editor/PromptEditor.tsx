import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Button, Col, Input, Row, Space } from 'antd'
import { isEmpty } from 'lodash'
import { PromptHelpers, generateDynamicPlaceholder } from '../../../utils'
import { SendOutlined } from '@ant-design/icons'
import { TextAreaRef } from 'antd/es/input/TextArea'
import EditorPlugins from './plugins'
import ImagePromptList from './ImagePromptList'
import { ImageUploadList } from './plugins/ImageUpload'

type Props = {
    onSend: (value: string, imageList: string[]) => void,
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
    const [controlledValue, setControlledValue] = useState<string | undefined>(undefined)
    const [interimValue, setInterimValue] = useState<string | undefined>(undefined)
    const [inputMode, setInputMode] = useState<PointerEvent['pointerType']>(InputMode.Mouse)
    const [imageList, setImageList] = useState<ImageUploadList[]>([])
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
                if (!isEmpty(value?.trim?.())) {
                    setEnableSend(true)
                }
            }
        }
    ), [inputMode])

    useEffect(() => {
        const typewriter = generateDynamicPlaceholder({ id: 'chat-prompt', options: PromptHelpers })
        return () => {
            typewriter.stop()
        }
    }, [])

    return (
        <Row>
            <Col span={24}>
                <ImagePromptList
                    data={imageList.map(image => (
                        {
                            id: image.file.uid,
                            src: image.url,
                            title: image.file.name
                        }
                    ))}
                    onDelete={(id) => {
                        setImageList(imageList.filter(s => s.file.uid !== id))
                    }}
                />
            </Col>

            <Col span={24}>
                <EditorPlugins
                    disabled={disabled}
                    speech={{
                        onStart: () => inputRef.current.focus(),
                        onStop: () => inputRef.current.focus(),
                        onInterimResult: (result) => {
                            if (!isEmpty(result.trim())) {
                                setInterimValue(((controlledValue || '') + ' ' + result).trim())
                            } else {
                                setInterimValue(undefined)
                            }
                        },
                        onResult: (result) => {
                            setControlledValue(((controlledValue || '') + ' ' + result).trim())
                            inputRef.current.focus()
                            setEnableSend(true)
                        }
                    }}
                    imageUpload={{
                        onChange: (imageList) => {
                            setImageList(imageList)
                            inputRef.current.focus()
                        },
                        value: imageList
                    }}
                />

                <Space.Compact block>
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
                            if (inputMode !== pointerEvent?.pointerType) {
                                setInputMode(pointerEvent.pointerType)
                            }
                        }}
                        className='prompt-editor'
                        placeholder={key > 0 ? undefined : `Ask Tadashi `}
                        onChange={(event) => {
                            if (controlledValue !== undefined) {
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
                        value={interimValue || controlledValue}
                    />
                    <Button
                        className='send-btn'
                        type='primary'
                        icon={<SendOutlined />}
                        disabled={disabled || !enableSend}
                        onClick={sendPrompt}
                    />
                </Space.Compact>
            </Col>
        </Row>
    )

    function sendPrompt() {
        if (enableSend && !disabled) {
            onSend(inputRef.current.resizableTextArea.textArea.value.trim(), imageList.map(s => s.url))
            setControlledValue(undefined)
            setEnableSend(false)
            setImageList([])
            setKey(key + 1)
        }
    }
})

export default PromptEditor