import { Card, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import MarkdownPreview from '@uiw/react-markdown-preview';

type Props = {
    id: string
    content: string,
    date: Date,
    className?: string,
    allowMarkdownContent?: boolean
}

export default function DialogBubble(props: Props) {

    const { id, content, date, className = '', allowMarkdownContent = false } = props

    return (
        <div id={id} className={'dialog-bubble'.concat(" ", className).trim()}>
            <div className='dialog-content-container'>
                <Card className='dialog-content'>
                    {
                        allowMarkdownContent ?
                        <MarkdownPreview source={content}/>
                        :
                        content
                    }
                </Card>
                <div className='dialog-timestamp'>
                    <Tooltip 
                        title={dayjs(date).format('Do MMM YYYY, HH:mm:ss')} 
                        placement='bottomRight'
                        arrow={false}
                    >
                        <Typography.Text type='secondary'> 
                        {
                            dayjs(date).diff(dayjs(), 'days') === 0 ?
                                dayjs(date).format('HH:mm')
                                :
                                dayjs(date).format('DD-MM-YY, HH:mm')
                        }
                        </Typography.Text>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}