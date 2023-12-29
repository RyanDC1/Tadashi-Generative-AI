import { Tooltip, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { TooltipPropsWithTitle } from 'antd/es/tooltip'

interface Props extends TooltipPropsWithTitle {}

export default function TooltipHelper(props: Props) {
  return (
    <Tooltip placement='right' {...props}>
        <Typography.Text type='secondary'>
            <InfoCircleOutlined className='tooltip-helper-icon'/>
        </Typography.Text>
    </Tooltip>
  )
}