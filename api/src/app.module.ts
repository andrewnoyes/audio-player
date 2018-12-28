import { Module } from '@nestjs/common';

import { SongsController } from 'controllers';
import { SongService } from 'services';
import { ChannelGateway } from 'gateways';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [SongService, ChannelGateway],
})
export class AppModule { }
