import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PropTypes from 'prop-types';

const spotifyApi = new SpotifyWebApi();

const PlaylistFetcher = ({ onFetch }) => {
    const [playlistUrl, setPlaylistUrl] = React.useState('');
    const [playlistTracks, setPlaylistTracks] = React.useState(null);

    const extractPlaylistId = (url) => {
        const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
        return match ? match[1] : url;
    };

    const handleFetchPlaylist = () => {
        const playlistId = extractPlaylistId(playlistUrl);
        spotifyApi.getPlaylistTracks(playlistId).then(data => {
            const tracks = data.items.map(item => ({
                name: item.track.name,
                artist: item.track.artists.map(artist => artist.name).join(', ')
            }));
            setPlaylistTracks(tracks);
            onFetch(tracks);
        }).catch(error => {
            console.error(error);
            });
        };

    return (
        <div className="mb-4 w-full">
            <input
            type="text"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="Enter a Spotify playlist URL"
            className="mb-2 p-2 border rounded w-full"
            />
            <button
                onClick={handleFetchPlaylist}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                >
                Fetch Playlist
            </button>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">
                    Playlist Tracks
                </h2>
                <ul>
                    {playlistTracks.map((track, index) => (
                        <li key={index}>
                            <strong>{track.name}</strong> - {track.artist}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

PlaylistFetcher.propTypes = {
    onFetch: PropTypes.func.isRequired,
};

export default PlaylistFetcher;