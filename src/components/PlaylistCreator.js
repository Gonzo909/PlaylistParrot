import React,{ useState } from 'react';
import axios from 'axios';

const PlaylistCreator = ({ playlistData }) => {
    const [youtubePlaylistid, setYoutubePlaylistId] = useState('');

    const handleCreatePlaylist = () => {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=${apiKey}`;

        const data = {
            snippet: {
                title: playlistData.name,
                description: playlistData.description,
            }
        };

        axios.post(url, data).then(response => {
            setYoutubePlaylistId(response.data.id);
        }).catch(error => {
            console.error(error);
        });

    };

    return (
        <div className="mb-4 w-full">
            <button
             onClick={handleCreatePlaylist}
             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
             >
                Create YouTube Playlist
            </button>
            {youtubePlaylistId && (<p className="mt-4">Created Playlist ID: {youtubePlaylistId}</p>)}
        </div>
    );
}

export default PlaylistCreator;