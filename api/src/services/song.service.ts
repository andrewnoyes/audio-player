import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v4';
import * as fs from 'fs';
import * as mm from 'music-metadata';

import { Song } from 'entities';

const METADATA_DIR = './songs-metadata';
const BASE_URL = 'http://localhost:1337'; // TODO: just for dev, move to config

if (!fs.existsSync(METADATA_DIR)) {
    fs.mkdirSync(METADATA_DIR);
}

const getMetadataPath = (songId: string) => `${METADATA_DIR}/${songId}`;

@Injectable()
export class SongService {
    public async createSong(name: string, filename: string, filepath: string) {
        const song = new Song();

        song.id = uuid();
        song.name = name;
        song.filename = filename;
        song.createdAt = new Date();
        song.url = `${BASE_URL}/media/${filename}`;

        try {
            const metadata = await mm.parseFile(filepath, { native: true });
            // tslint:disable-next-line:no-console
            console.log('metadata', metadata);
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log('failed parse metadata', error);
        }

        await this.saveSong(song);

        return song;
    }

    public async getAllSongs(): Promise<Song[]> {
        const songIds = await this.fetchAllSongIds();
        if (!songIds.length) {
            return [];
        }

        const promises = [];
        for (const songId of songIds) {
            promises.push(this.fetchSong(songId));
        }

        return await Promise.all(promises);
    }

    public async getSong(songId: string): Promise<Song> {
        return await this.fetchSong(songId);
    }

    private fetchAllSongIds(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(METADATA_DIR, (error, filenames) => {
                error ? reject(error) : resolve(filenames);
            });
        });
    }

    private fetchSong(songId: string): Promise<Song> {
        return new Promise((resolve, reject) => {
            fs.readFile(getMetadataPath(songId), (error, data) => {
                error ? reject(error) : resolve(JSON.parse(data.toString('utf8')) as Song);
            });
        });
    }

    private saveSong(song: Song): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(getMetadataPath(song.id), JSON.stringify(song), error => {
                error ? reject(error) : resolve();
            });
        });
    }
}
