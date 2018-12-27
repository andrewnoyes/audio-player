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
    @UseInterceptors(FileInterceptor('file', { dest: 'songs-uploads' }))
    public async create(@UploadedFile() file): Promise<Song> {
        try {
            const { originalname, filename } = file;
            return await this.songService.createSong(originalname, filename);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
