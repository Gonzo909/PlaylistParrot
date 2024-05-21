import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import PlaylistCreator from './PlaylistCreator';
import PlaylistFetcher from './PlaylistFetcher';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const HomePage = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [playlistData, setPlaylistData] = useState(null);

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const token = params.get('access_token');

        if (token) {
            spotifyApi.setAccessToken(token);
            setAccessToken(token);
            window.location.hash = '';
        }
        
    }, []);

    const handleLogin = (token) => {
        setAccessToken(token);
    };

    const handleFetch = (data) => {
        setPlaylistData(data);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <header className="w-full bg-blue-500 p-4 text-white text-center text-2x1 font-bold">
                Playlist Parrot
            </header>
            <main className="flex flex-col items-center w-full max-w-2x1 mt-8">
                {!accessToken ? (
                    <Auth onLogin={handleLogin} />
                ) : (
                    <>
                        <PlaylistFetcher onFetch={handleFetch} />
                        {playlistData && <PlaylistCreator playlistData={playlistData} />}
                    </>
                )}
            </main>

        </div>
    );
};

export default HomePage;
