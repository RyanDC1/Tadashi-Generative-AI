import React from 'react'
import { Space } from 'antd'
import SpeechToText from './SpeechToText'
import ImageUpload from './ImageUpload'
import ErrorBoundary from '../../../errorBoundary/ErrorBoundary'
import EditorPluginWrapper from './EditorPluginWrapper'

type Props = {
    disabled?: boolean,
    speech?: React.ComponentProps<typeof SpeechToText>,
    imageUpload?: React.ComponentProps<typeof ImageUpload>
}

export default function EditorPlugins(props: Props) {

    const {
        disabled = false,
        speech: speechPluginProps,
        imageUpload: imageUploadPluginProps
    } = props

    return (
        <Space
            className='editor-plugins'
            direction='vertical'
            size={1}
        >
            <EditorPluginWrapper
                id='image-upload-plugin'
                showDivider={false}
            >
                <ErrorBoundary>
                    <ImageUpload
                        disabled={disabled}
                        {...imageUploadPluginProps}
                    />
                </ErrorBoundary>
            </EditorPluginWrapper>

            <EditorPluginWrapper
                id='speech-plugin'
            >
                <ErrorBoundary>
                    <SpeechToText
                        disabled={disabled}
                        {...speechPluginProps}
                    />
                </ErrorBoundary>
            </EditorPluginWrapper>
        </Space>
    )
}