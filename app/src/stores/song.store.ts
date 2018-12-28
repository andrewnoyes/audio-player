import { observable, action } from 'mobx';

import { client } from 'api';

export class SongStore {
    @observable
    public loading: boolean = false;

    @observable
    public uploading: boolean = false;

    @observable
    public songs: any[] = [];

    @observable
    public selectedSong: any;

    constructor() {
        client.onSongCreated(this.onSongCreated);
    }

    public loadSongs = async () => {
        try {
            this.setLoading(true);

            const songs = await client.fetchSongs();

            this.setSongs(songs);
        } catch (error) {
            console.log('loadSongs', error.message);
        } finally {
            this.setLoading(false);
        }
    }

    public uploadSong = async (file: any) => {
        try {
            this.setUploading(true);

            await client.uploadSong(file);
        } catch (error) {
            console.log('uploadSong', error.message);
        } finally {
            this.setUploading(false);
        }
    }

    @action
    public selectSong = (song: any) => {
        this.selectedSong = song;
    }

    @action
    private setSongs = (songs: any[]) => {
        this.songs = songs;
    }

    @action
    private setLoading = (loading: boolean) => {
        this.loading = loading;
    }

    @action
    private setUploading = (uploading: boolean) => {
        this.uploading = uploading;
    }

    @action
    private onSongCreated = (song: any) => {
        this.songs.push(song);
    }
}

export default new SongStore();