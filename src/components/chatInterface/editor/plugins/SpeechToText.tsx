import { useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type Props = {
    disabled?: boolean,
    onResult?: (result: string) => void,
    onInterimResult?: (result: string) => void,
    onStart?: () => void,
    onStop?: () => void
}

interface NavigatorUserAgent {
    brands: Browser[];
    mobile: boolean;
    platform: string;
}
interface Browser {
    brand: string;
    version: string;
}

/** @ts-expect-error - userAgentData limited support  @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData#browser_compatibility*/
const userAgentData: NavigatorUserAgent | undefined = navigator?.userAgentData
const allowedBrowsers = ['Google Chrome']
const allowSpeechRecognition = !userAgentData?.mobile && userAgentData?.brands?.find?.(s => allowedBrowsers.includes(s?.brand))

const { startListening, abortListening } = SpeechRecognition

export default function SpeechToText(props: Props) {

    const { disabled = false, onResult, onInterimResult, onStart, onStop } = props

    const {
        listening,
        browserSupportsSpeechRecognition,
        interimTranscript,
        finalTranscript,
        isMicrophoneAvailable,
        resetTranscript
    } = useSpeechRecognition()

    useEffect(() => {
        if (listening && disabled === true) {
            abortListening()
            resetTranscript()
        }
    }, [disabled])

    useEffect(() => {
        if(listening)
        {
            onInterimResult(interimTranscript)
        }
    }, [interimTranscript])

    useEffect(() => {
        if(listening)
        {
            onResult(finalTranscript)
            resetTranscript()
        }
    }, [finalTranscript])

    if(!browserSupportsSpeechRecognition || !allowSpeechRecognition)
    {
        return null
    }

    return (
        <Tooltip
            placement='left'
            title={
                (isMicrophoneAvailable) ?
                    (
                        listening ?
                            'Disable Speech to Text'
                            :
                            'Enable Speech to Text'
                    )
                    :
                    'No Microphone Detected'
            }
        >
            <Button
                className='speech-btn'
                onClick={() => {
                    if(listening)
                    {
                        abortListening()
                        onStop?.()
                    }
                    else {
                        startListening({ continuous: true, interimResults: false })
                        onStart?.()
                    }
                }}
                type='text'
                disabled={disabled || !isMicrophoneAvailable}
                icon={listening ? <AudioOutlined /> : <AudioMutedOutlined />}
            />
        </Tooltip>
    )
}