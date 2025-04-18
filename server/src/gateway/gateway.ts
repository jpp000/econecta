import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { MESSAGES_EVENTS } from "src/common/constants/events";

@WebSocketGateway(4000, {
    cors: '*'
})
export class MessagesGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id)
            console.log('connected')
        })
    }


    @SubscribeMessage(MESSAGES_EVENTS.CREATE_MESSAGE)
    onCreateMessage(@MessageBody() body: any) {
        console.log(body)
        this.server.emit('onMessage', {
            msg: 'new message',
            content: body,
        });
    }

}