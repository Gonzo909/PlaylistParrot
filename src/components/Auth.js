import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const Auth = ({ onLogin }) => {
    const handleSpotifyLogin = () => {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
        const scopes = [
            'user-read-private',
            'user-read-email',
            'playlist-read-private',
        ];
        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${redirectUri}`;
        window.location = authUrl;
    };

    React.useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');

        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
            onLogin(accessToken);
        }
    }, [onLogin]);

    return ( 
        <div className="mb-4">
            <button 
                onClick={handleSpotifyLogin}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Login with Spotify
            </button>
        </div>
    )
}

export default Auth;