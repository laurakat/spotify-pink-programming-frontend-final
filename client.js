const readAccessTokenFromURL = () => {
	const query = window.location.search.substring(1);

	const searchParams = new URLSearchParams(window.location.search)
	accessToken = searchParams.get('access_token')

	//redirect to login page if no access token provided
	if (!accessToken) {
		window.location.href = '/'
	}
}

const addTracksToDOM = (name, image, trackURI) => {
	const tracksDiv = document.getElementById('tracks');
	const html = `<div class='track'>
		<h3>${name}</h3>
		<img src='${image}' onClick='playTrack("${trackURI}")' />
	</div>`
	tracksDiv.innerHTML = tracksDiv.innerHTML + html
}

const addSearchResultsToDOM = (name, id) => {
	const searchResultsDiv = document.getElementById('search-results');

	const html = `<div class='result'>
		${name}
		<button class='btn btn-green btn-sm pull-right' onClick="getArtistTopTenTracks('${id}')">
			Get Top 10 Tracks
		</button>
		</div>`;

	searchResultsDiv.innerHTML = searchResultsDiv.innerHTML + html;
}

const clearSearchResults = () => {
	const searchResultsDiv = document.getElementById('search-results');
	searchResultsDiv.innerHTML = "";
}

const clearTracks = () => {
	const tracksDiv = document.getElementById("tracks");
	tracksDiv.innerHTML = "";
}

const search = () => {
	clearSearchResults();
	const searchTextElem = document.getElementById("search-text");

	console.log(searchTextElem.value);

	const url = `https://api.spotify.com/v1/search?q=${searchTextElem.value}&type=artist&limit=3`;
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}

	fetch(url, options)
	.then(response => response.json())
	.then(json => {
		console.log(json)

		json.artists.items.forEach(artist => {
			addSearchResultsToDOM(artist.name, artist.id);
		})

	});
}

const getArtistTopTenTracks = id => {
	console.log('get top 10 tracks');

	fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE`, 
	{
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
	.then(response => response.json())
	.then(json => {
		console.log(json);

		clearTracks();
		json.tracks.forEach(track => addTracksToDOM(track.name, track.album.images[0].url, track.uri));
	})
}

readAccessTokenFromURL();