import React from 'react'
import SpeechToText from './SpeechToText'
import ErrorBoundary from '../../../errorBoundary/ErrorBoundary'

type Props = {
    disabled?: boolean,
    speech?: React.ComponentProps<typeof SpeechToText>
}

export default function EditorPlugins(props: Props) {

    const { disabled = false, speech } = props

    return (
        <div className='editor-plugins'>
            <ErrorBoundary>
                <SpeechToText 
                    disabled={disabled}
                    {...speech}
                />
            </ErrorBoundary>
        </div>
    )
}