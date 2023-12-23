import { Badge, Card, Col, Row, Space, Typography, notification } from "antd"
import TooltipHelper from "../../tooltipHelper/TooltipHelper"
import { ChatModes as ChatModeType } from "../../../models"
import { useConfig } from "../../../utils"
import { CheckCircleFilled } from "@ant-design/icons"

type BadgeProps = {
    children: React.ReactNode,
    hidden?: boolean
}

const ChatModeBadge = ({ children, hidden }: BadgeProps) => {
    return (
        !hidden ?
        <Badge className="chat-mode-checked-icon" count={<CheckCircleFilled style={{ background: '#fff', borderRadius: 8 }} />} offset={[-15, 15]}>
            {children}
        </Badge>
        :
        children
    )
}

export default function ChatModes() {

    const { chatMode, setChatModeState } = useConfig()

    const [notify, notifyContext] = notification.useNotification()

    return (
        <div>
            {notifyContext}
            <span>
                <Space className="align-base">
                    <Typography.Title level={5}>
                        Chat Modes
                    </Typography.Title>
                    <TooltipHelper
                        title={
                            <>
                                <p>Select the chat mode, this sets the temperature for the model (0.1 - 1.0)</p>
                                <p><b>Creative (0.0)</b> - Responses are diverse</p>
                                <p><b>Precise (1.0)</b> - Responses are deterministic</p>
                                <p><b>Balanced (0.5)</b> - Best of both worlds</p>
                            </>
                        }
                    />
                </Space>
            </span>
            <div className="chat-modes">
                <Row gutter={[16, 16]}>
                    <Col lg={8} sm={24} xs={24}>
                        <ChatModeBadge hidden={chatMode !== ChatModeType.Creative}>
                            <Card
                                hoverable
                                className={"chat-mode chat-mode-creative".concat(chatMode === ChatModeType.Creative ? ' selected' : '')}
                                onClick={() => updateMode(ChatModeType.Creative)}
                            >
                                <Typography.Text strong>
                                    Creative
                                </Typography.Text>
                            </Card>
                        </ChatModeBadge>
                    </Col>
                    <Col lg={8} sm={24} xs={24}>
                        <ChatModeBadge hidden={chatMode !== ChatModeType.Balanced}>
                            <Card
                                hoverable
                                className={"chat-mode chat-mode-balanced".concat(chatMode === ChatModeType.Balanced ? ' selected' : '')}
                                onClick={() => updateMode(ChatModeType.Balanced)}
                            >
                                <Typography.Text strong>
                                    Balanced
                                </Typography.Text>
                            </Card>
                        </ChatModeBadge>
                    </Col>
                    <Col lg={8} sm={24} xs={24}>
                        <ChatModeBadge hidden={chatMode !== ChatModeType.Precise}>
                            <Card
                                hoverable
                                className={"chat-mode chat-mode-precise".concat(chatMode === ChatModeType.Precise ? ' selected' : '')}
                                onClick={() => updateMode(ChatModeType.Precise)}
                            >
                                <Typography.Text strong>
                                    Precise
                                </Typography.Text>
                            </Card>
                        </ChatModeBadge>
                    </Col>
                </Row>
            </div>
        </div>
    )

    function getNotification(mode: ChatModeType) {
        const _notifications = {
            [ChatModeType.Creative]: () => {
                notify.success({
                    placement: 'bottomRight',
                    key: 'CHAT_MODE_UPDATED_NOTIFICATION',
                    message: 'Mode updated to Creative',
                    description: 'Tadashi will try to generate more unique and creative responses, this may result in inaccuracies.'
                })
            },
            [ChatModeType.Balanced]: () => {
                notify.success({
                    placement: 'bottomRight',
                    key: 'CHAT_MODE_UPDATED_NOTIFICATION',
                    message: 'Mode updated to Balanced',
                    description: 'Tadashi will generate answers that are both creative and accurate.'
                })
            },
            [ChatModeType.Precise]: () => {
                notify.success({
                    placement: 'bottomRight',
                    key: 'CHAT_MODE_UPDATED_NOTIFICATION',
                    message: 'Mode updated to Precise',
                    description: 'Tadashi will generate answers determinstic and accurate.'
                })
            }
        }[mode]()
    }

    function updateMode(chatMode: ChatModeType) {
        setChatModeState(chatMode)
        getNotification(chatMode)
    }
}