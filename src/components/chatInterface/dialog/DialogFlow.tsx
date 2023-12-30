import { useEffect, useLayoutEffect } from 'react'
import { Typography } from 'antd'
import { debounce, last } from 'lodash'
import { ChatActorType, DialogType } from '../../../models'
import DialogBubble from './DialogBubble'
import { LoadingOutlined } from '@ant-design/icons'
import { scrollIntoView } from '../../../utils'
import Fade from 'react-reveal/Fade';

type Props = {
    dialog: DialogType[],
    loading?: boolean
}

const debouncedScroll = debounce(scrollIntoView, 25)

export default function DialogFlow(props: Props) {

    const { dialog, loading = false } = props

    const dialogAnimationDelay = dialog.length == 1 ? 120 : 0

    useLayoutEffect(() => {
        if (loading) {
            // reset scroll on every new dialog
            debouncedScroll({
                id: 'response-loading-indicator',
                options: {
                    block: 'start'
                },
                delay: 400
            })
        }
    }, [loading])

    useLayoutEffect(() => {
        if (dialog.length > 0 && last(dialog).author === ChatActorType.AI) {
            // reset scroll on every new dialog
            debouncedScroll({
                id: String(last(dialog).id),
                options: {
                    block: 'start'
                },
                delay: 400
            })
        }
    }, [dialog])


    return (
        <>
            {
                dialog.map((dialogContent) => (
                    <Fade key={dialogContent.id} collapse bottom duration={450} delay={dialogAnimationDelay}>
                        {dialogContent.author === ChatActorType.AI ?
                            <DialogBubble
                                id={String(dialogContent.id)}
                                key={dialogContent.id}
                                content={dialogContent.content}
                                date={dialogContent.date}
                                className='ai-dialog-bubble'
                                allowMarkdownContent
                            />
                            :
                            <DialogBubble
                                id={String(dialogContent.id)}
                                key={dialogContent.id}
                                content={dialogContent.content}
                                date={dialogContent.date}
                                className='user-dialog-bubble'
                            />}
                    </Fade>
                ))
            }
            {
                loading &&
                <Fade collapse bottom duration={450} delay={dialogAnimationDelay}>
                    <Typography.Text className='pad-14' id='response-loading-indicator' type='secondary' strong>
                        Generating Response <LoadingOutlined color='#52C41A' className='ml-4' />
                    </Typography.Text>
                </Fade>
            }
        </>
    )
}