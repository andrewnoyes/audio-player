import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import * as pubsub from 'pubsub-js';

interface IChannelUser {
    id: string;
    username: string;
    song?: any;
}

@WebSocketGateway()
export class ChannelGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    private server;

    private users: Map<string, IChannelUser> = new Map();

    constructor() {
        pubsub.subscribe('song-created', this.onSongCreated);
    }

    @SubscribeMessage('user:connect')
    public onConnectUser(client: any, data: any): any {
        const { username } = data;
        if (!username) {
            return { successful: false, error: 'Username is required' };
        }

        const otherUsers: IChannelUser[] = [];
        for (const [key, value] of this.users) {
            otherUsers.push({
                id: key,
                username: value.username,
                song: value.song || null,
            });
        }

        const id = client.id;
        const user = { id, username, status: '' };
        this.users.set(id, user);

        client.broadcast.emit('user:connected', user);

        return { successful: true, users: otherUsers };
    }

    @SubscribeMessage('user:disconnect')
    public onDisconnectUser(client: any): void {
        this.handleDisconnect(client);
    }

    @SubscribeMessage('user:update')
    public onUpdateUser(client: any, data: any): any {
        if (!this.users.has(client.id)) {
            return { successful: false, error: 'User ID not found' };
        }

        if (!data) {
            return { successful: false, error: 'No data provided' };
        }

        const user = Object.assign({}, this.users.get(client.id));
        const { song } = data;

        user.song = song || null;

        this.users.set(client.id, user);

        client.broadcast.emit('user:updated', user);

        return { successful: true };
    }

    handleDisconnect(client: any) {
        if (this.users.has(client.id)) {
            this.users.delete(client.id);
        }

        client.broadcast.emit('user:disconnected', { id: client.id });
    }

    private onSongCreated = (message: string, song: any) => {
        this.server.emit('song:created', song);
    }
}
