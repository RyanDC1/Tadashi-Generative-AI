import { useLayoutEffect } from 'react'
import { Typography } from 'antd'
import { debounce, last } from 'lodash'
import { ChatActorType, DialogType } from '../../../models'
import DialogBubble from './DialogBubble'
import { LoadingOutlined } from '@ant-design/icons'
import { scrollToElement } from '../../../utils'
import Fade from 'react-reveal/Fade';

type Props = {
    dialog: DialogType[],
    loading?: boolean
}

const debouncedScroll = debounce(scrollToElement, 60)

export default function DialogFlow(props: Props) {

    const { dialog, loading = false } = props

    const dialogAnimationDelay = dialog.length == 1 ? 120 : 0

    useLayoutEffect(() => {
        if (loading) {
            // reset scroll on every new dialog
            debouncedScroll({
                id: 'response-loading-indicator',
                delay: 400,
                scrollContainer: document.getElementById('chat-scroll-container'),
                padding: document.getElementById('layout-header')?.clientHeight,
                position: 'bottom'
            })
        }
    }, [loading])

    useLayoutEffect(() => {
        if (dialog.length > 0 && last(dialog).author === ChatActorType.AI) {
            // reset scroll on every new dialog
            debouncedScroll({
                id: String(last(dialog).id),
                delay: 400,
                scrollContainer: document.getElementById('chat-scroll-container'),
                padding: document.getElementById('layout-header')?.clientHeight,
            })
        }
    }, [dialog])


    return (
        <>
            {
                dialog.map((dialogContent) => (
                    <span key={dialogContent.id} id={String(dialogContent.id)}>
                        <Fade collapse bottom duration={450} delay={dialogAnimationDelay}>
                            {dialogContent.author === ChatActorType.AI ?
                                <DialogBubble
                                    content={dialogContent.content}
                                    date={dialogContent.date}
                                    className='ai-dialog-bubble'
                                    allowMarkdownContent
                                />
                                :
                                <DialogBubble
                                    content={dialogContent.content}
                                    date={dialogContent.date}
                                    className='user-dialog-bubble'
                                    images={dialogContent.images}
                                />}
                        </Fade>
                    </span>
                ))
            }
            {
                loading &&
                <span id='response-loading-indicator'>
                    <Fade collapse bottom duration={450} delay={dialogAnimationDelay}>
                        <Typography.Text className='pad-14' type='secondary' strong>
                            Generating Response <LoadingOutlined color='#52C41A' className='ml-4' />
                        </Typography.Text>
                    </Fade>
                </span>
            }
        </>
    )
}