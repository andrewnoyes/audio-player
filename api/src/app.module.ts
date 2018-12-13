import { Module } from '@nestjs/common';
import { SongsController } from 'controllers';
import { SongService } from 'services';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [SongService],
})
export class AppModule { }
