import { Module } from '@nestjs/common';

import { SongsController } from 'controllers';
import { SongService } from 'services';
import { UserGateway } from 'gateways';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [SongService, UserGateway],
})
export class AppModule { }
