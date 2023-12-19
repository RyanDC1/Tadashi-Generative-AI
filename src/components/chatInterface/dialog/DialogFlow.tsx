import { useEffect } from 'react'
import { Typography } from 'antd'
import { last } from 'lodash'
import { ChatActorType, DialogType } from '../../../models'
import DialogBubble from './DialogBubble'
import { LoadingOutlined } from '@ant-design/icons'
import { scrollIntoView } from '../../../utils'

type Props = {
    dialog: DialogType[],
    loading?: boolean
}

export default function DialogFlow(props: Props) {

    const { dialog, loading = false } = props

    useEffect(() => {
        if(dialog.length > 0)
        {
            // reset scroll on every new dialog
            scrollIntoView({
                id: loading ? 'response-loading-indicator' : String(last(dialog).id),
                options: {
                    block: 'start'
                }
            })
        }
    }, [dialog, loading])
    

    return (
        <>
            {
                dialog.map((dialogContent) => (
                    dialogContent.author === ChatActorType.AI ?
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
                        />
                ))
            }
            {
                loading &&
                <Typography.Text className='pad-14' id='response-loading-indicator' type='secondary' strong>
                    Generating Response <LoadingOutlined color='#52C41A' className='ml-4'/>
                </Typography.Text>
            }
        </>
    )
}