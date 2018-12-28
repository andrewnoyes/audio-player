import {
    Controller,
    Get,
    Post,
    Param,
    BadRequestException,
    UseInterceptors,
    FileInterceptor,
    UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import * as uuid from 'uuid/v4';
import * as pubsub from 'pubsub-js';

import { Song } from 'entities';
import { SongService } from 'services';

@Controller('songs')
export class SongsController {
    constructor(private readonly songService: SongService) { }

    @Get()
    public async findAll(): Promise<Song[]> {
        try {
            return await this.songService.getAllSongs();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':id')
    public async findOne(@Param('id') id): Promise<Song> {
        try {
            return await this.songService.getSong(id);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'songs-uploads');
            },
            filename: (req, file, cb) => {
                cb(null, `${uuid()}-${file.originalname}`);
            },
        }),
    }))
    public async create(@UploadedFile() file): Promise<Song> {
        try {
            const { originalname, filename, path } = file;
            const song = await this.songService.createSong(originalname, filename, path);

            pubsub.publish('song-created', song);

            return song;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
