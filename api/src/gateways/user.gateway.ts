import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway()
export class UserGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    private server;

    private users: Map<string, string> = new Map();

    @SubscribeMessage('user:connect')
    public onConnectUser(client: any, data: any): any {
        const { username } = data;
        if (!username) {
            return { successful: false, error: 'Username is required' };
        }

        const otherUsers: any[] = [];
        for (const [key, value] of this.users) {
            otherUsers.push({
                id: key,
                username: value,
            });
        }

        const id = client.id;
        this.users.set(id, username);

        client.broadcast.emit('user:connected', { id, username });

        return { successful: true, users: otherUsers };
    }

    @SubscribeMessage('user:disconnect')
    public onDisconnectUser(client: any): void {
        this.handleDisconnect(client);
    }

    handleDisconnect(client: any) {
        if (this.users.has(client.id)) {
            this.users.delete(client.id);
        }

        client.broadcast.emit('user:disconnected', { id: client.id });
    }
}
