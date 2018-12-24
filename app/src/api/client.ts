import axios from 'axios';
import { API_URL } from './config';

export class Client {
    public uploadSong = async (file: any) => {
        const formData = new FormData();
        
        formData.append('file', file);

        const response = await axios.post(`${API_URL}/songs`, formData);

        console.log('response', response);

        return response.data;
    }

    public fetchSongs = async () => {
        const response = await axios.get(`${API_URL}/songs`);

        console.log('fetch response', response);

        return response.data;
    }
}

export default new Client();