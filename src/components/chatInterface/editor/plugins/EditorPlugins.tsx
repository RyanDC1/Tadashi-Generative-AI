import React from 'react'
import { Divider, Space } from 'antd'
import SpeechToText from './SpeechToText'
import ImageUpload from './ImageUpload'
import ErrorBoundary from '../../../errorBoundary/ErrorBoundary'

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
            split={<Divider />}
            size={1}
        >
            <ErrorBoundary>
                <ImageUpload
                    disabled={disabled}
                    {...imageUploadPluginProps}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <SpeechToText
                    disabled={disabled}
                    {...speechPluginProps}
                />
            </ErrorBoundary>
        </Space>
    )
}