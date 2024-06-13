import { useState } from 'react'
import { Button, Carousel, ConfigProvider, Image } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import { darkTheme } from '../../themes/theme'

type Props = {
    images: string[]
}

export default function ImagePreview(props: Props) {

    const { images } = props

    const [carouselIndex, setCarouselIndex] = useState(0)
    const [previewSlideIndex, setPreviewSlideIndex] = useState(undefined)


    return (
        !isEmpty(images) &&
        <ConfigProvider
            theme={darkTheme}
        >
            <Image.PreviewGroup
                preview={{
                    current: previewSlideIndex ?? carouselIndex,
                    onChange: (currentSlide) => {
                        setPreviewSlideIndex(currentSlide)
                    },
                    afterOpenChange(open) {
                        !open && setPreviewSlideIndex(undefined)
                    },
                }}
                items={
                    images.map(image => (
                        {
                            src: image
                        }
                    ))
                }
            >
                <Carousel
                    afterChange={(currentSlide) => {
                        setCarouselIndex(currentSlide)
                    }}
                    className='image-prompt-carousel'
                    arrows
                    adaptiveHeight={false}
                    nextArrow={
                        <Button
                            icon={<RightOutlined />}
                        />
                    }
                    prevArrow={
                        <Button
                            icon={<LeftOutlined />}
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
            </Image.PreviewGroup>
        </ConfigProvider>
    )
}