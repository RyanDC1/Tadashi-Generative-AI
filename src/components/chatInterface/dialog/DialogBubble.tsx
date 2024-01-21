import { Button, Card, Carousel, Image, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'

dayjs.extend(advancedFormat)

type Props = {
    content: string,
    date: Date,
    className?: string,
    allowMarkdownContent?: boolean,
    images?: string[]
}

export default function DialogBubble(props: Props) {

    const { content, date, className = '', allowMarkdownContent = false, images = [] } = props

    return (
        <div className={'dialog-bubble'.concat(" ", className).trim()}>
            <div className='dialog-content-container'>
                <Card className='dialog-content'>
                    {
                        !isEmpty(images) && 
                        <Carousel
                            className='image-prompt-carousel'
                            arrows
                            adaptiveHeight={false}
                            nextArrow={
                                <Button
                                    icon={<RightOutlined/>}
                                />
                            }
                            prevArrow={
                                <Button
                                    icon={<LeftOutlined/>}
                                />
                            }
                        >
                            {
                                images.map((image, index) => (
                                    <Image
                                        src={image}
                                        key={index}
                                    />
                                ))
                            }
                        </Carousel>
                    }
                    {
                        allowMarkdownContent ?
                            <MarkdownPreview source={content} />
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