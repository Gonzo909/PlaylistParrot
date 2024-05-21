import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const PlaylistFetcher = ({ onFetch }) => {
    const [playlistUrl, setPlaylistUrl] = React.useState('');
    const [playlistData, setPlaylistData] = React.useState(null);

    const handleFetchPlaylist = () => {
        const playlistId = extractPlaylistId(playlistUrl);
        spotifyApi.getPlaylist(playlistId).then(
            function(data) {
                setPlaylistData(data);
                onFetch(data);
            },
            function(err) {
                console.error(err);
            }
        );
    };

    const extractPlaylistId = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    return (
        <div className="mb-4 w-full">
            <input
            type="text"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="Enter a Spotify playlist URL"
            className="border p-2 rounded w-full"
            />
            <button
                onClick={handleFetchPlaylist}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                >
                Fetch Playlist
            </button>
            {playlistData && (
                <pre className="bg-gray-200 p-4 rounded mt-4 w-full">
                    {JSON.stringify(playlistData, null, 2)}
                </pre>
            )}
        </div>
    );
};


export default PlaylistFetcher;