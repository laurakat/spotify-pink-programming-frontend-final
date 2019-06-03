window.onSpotifyWebPlaybackSDKReady = () => {
	const token = accessToken;
	const player = new Spotify.Player({
		name: 'Web Playback SDK Quick Start Player',
		getOAuthToken: cb => { cb(token); }
	});

	player.addListener('ready', ({ device_id }) => {
    deviceId = device_id
  });

	player.connect();
}

const playTrack = trackURI => {
	console.log('playing track', trackURI);

	fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, 
		{ 
			headers: { Authorization: `Bearer ${accessToken}`},
			method: 'PUT',
			body: JSON.stringify({ uris: [trackURI] })
		}
	)
}