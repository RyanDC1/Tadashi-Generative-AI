import React, { useEffect, useMemo, useState } from "react"
import { Button, Tooltip, Upload, message as AntMessage } from "antd"
import { CameraOutlined } from "@ant-design/icons"
import { RcFile } from "antd/es/upload"
import { isEqual } from "lodash"
import { getBase64String } from "../../../../utils"

type Props = {
    disabled?: boolean
    value?: ImageUploadList[]
    onChange?: (imageList: ImageUploadList[]) => void
}

export interface ImageUploadList {
    url: string,
    file: RcFile
}

const MAX_UPLOAD_COUNT = 2
const MAX_FILE_SIZE_IN_MB = 4
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

export default function ImageUpload(props: Props) {

    const { disabled, onChange, value = [] } = props

    const [message, messageContext] = AntMessage.useMessage()

    const [imageList, setImageList] = useState<ImageUploadList[]>(value)

    const isMaxLimit = useMemo(() => imageList.length === MAX_UPLOAD_COUNT, [imageList])

    useEffect(() => {
      if(value !== undefined && !isEqual(value, imageList))
      {
        setImageList(value)
      }
    }, [value])


    return (
        <>
            {messageContext}

            <Upload
                fileList={imageList.map(s => s.file)}
                maxCount={MAX_UPLOAD_COUNT}
                disabled={disabled || isMaxLimit}
                accept={ALLOWED_FILE_TYPES.join(',')}
                showUploadList={false}
                beforeUpload={async (file) => {
                    const validFileSize = file.size / 1024 / 1024 < MAX_FILE_SIZE_IN_MB
                    const validFileType = ALLOWED_FILE_TYPES.includes(file.type)

                    if (!validFileType) {
                        message.error('Invalid file type, only JPEG / PNG allowed')
                        return false
                    }

                    if (!validFileSize) {
                        message.error(`Image size must be smaller than ${MAX_FILE_SIZE_IN_MB}MB`)
                        return false
                    }

                    const newFile: ImageUploadList = {
                        file,
                        url: await getBase64String(file)
                    }

                    const updatedFileList: ImageUploadList[] = [...imageList, newFile]
                    setImageList(updatedFileList)
                    onChange?.(updatedFileList)
                    return false
                }}
            >
                <Tooltip
                    title={!disabled ? `Upload an image (${imageList.length}/${MAX_UPLOAD_COUNT})` : null}
                    placement='left'
                >
                    <Button
                        className="upload-btn"
                        type='text'
                        disabled={disabled || isMaxLimit}
                        icon={<CameraOutlined />}
                    />
                </Tooltip>
            </Upload>
        </>
    )
}