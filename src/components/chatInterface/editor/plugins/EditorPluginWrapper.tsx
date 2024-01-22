import { useLayoutEffect, useState } from 'react'
import { Divider } from 'antd'

type Props = {
    children: React.ReactNode,
    id: string,
    showDivider?: boolean
}

export default function EditorPluginWrapper(props: Props) {

    const { children, showDivider = true, id } = props

    const [mountNode, setMountNode] = useState(true)

    useLayoutEffect(() => {
        if(!document.getElementById(id).querySelector('.editor-plugin-wrapper').hasChildNodes())
        {
            setMountNode(false)
        }
    }, [])

    return (
        mountNode &&
        <span id={id}>
            {
                showDivider &&
                <Divider className='plugin-element-split' />
            }
            <span className='editor-plugin-wrapper'>
                {children}
            </span>
        </span>
    )
}