import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

/**
 * 网关 - 聊天消息
 */
@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: 'message'
})
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server

    constructor(private readonly logger: Logger) {}

    handleConnection(client: Socket) {
        this.logger.log(
            `[连接已建立] 用户id：${client.id}`,
            MessageGateway.name
        )
    }

    handleDisconnect(client: Socket) {
        this.logger.log(
            `[连接已断开] 用户id：${client.id}`,
            MessageGateway.name
        )
    }

    @SubscribeMessage('send_someone')
    async sendToSomeOne(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket
    ) {
        this.logger.log(
            `[发送信息] 用户id：${client.id}，消息体：${data}`,
            MessageGateway.name
        )
    }
}
