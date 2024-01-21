
import { Button, Card, Flex, Image, Space, Typography } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

export type ImageList = {
    src: string,
    title: string,
    id: string
}

type Props = {
    data: ImageList[]
    onDelete: (id: string) => void
}

export default function ImagePromptList(props: Props) {

    const { data, onDelete } = props

    return (
        <Space 
            className="image-prompt-list-container"
            direction='vertical'
            size={4}
        >
            {
                data.map(image => (
                    <Card
                        key={image.id}
                        className="image-preview-container"
                    >
                        <Card.Meta
                            avatar={
                                <Image
                                    src={image.src}
                                />
                            }
                            title={
                                <Flex justify='space-between'>
                                    <Typography.Text className="image-preview-title">
                                        {image.title}
                                    </Typography.Text>
                                    <Button
                                        danger
                                        type='link'
                                        icon={<DeleteOutlined />}
                                        onClick={() => onDelete(image.id)}
                                    />
                                </Flex>
                            }
                        />
                    </Card>
                ))
            }
        </Space>
    )
}