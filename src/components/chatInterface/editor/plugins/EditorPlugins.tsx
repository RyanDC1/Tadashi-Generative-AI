import React from 'react'
import SpeechToText from './SpeechToText'

type Props = {
    disabled?: boolean,
    speech?: React.ComponentProps<typeof SpeechToText>
}

export default function EditorPlugins(props: Props) {

    const { disabled = false, speech } = props

    return (
        <div className='editor-plugins'>
            <SpeechToText 
                disabled={disabled}
                {...speech}
            />
        </div>
    )
}