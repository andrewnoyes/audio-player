import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class UserGateway {
    @SubscribeMessage('user:connect')
    public onUserConnected(client, data: any) {
        const { username } = data;
        if (!username) {
            return { successful: false, error: 'Username is required' };
        }

        client.broadcast.emit('user:connected', username);
        return { successful: true };
    }

    @SubscribeMessage('user:disconnect')
    public onUserDisconnected(client, data: any) {
        // TODO
    }
}
