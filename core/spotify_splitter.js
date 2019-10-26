import { fetchPlaylist, fetchArtists } from '../adapters/spotify'
import { frequencies } from './arrays'

export const fetchPlaylistInformation = async (playlistId, callback) => {
  try {
    const rawPlaylist = await fetchPlaylist(playlistId)
    const tracks = rawPlaylist.tracks.items.map((item) => {
      return {
        artists: item.track.artists.map((i) => i.name),
        artistId: item.track.artists[0].id,
        trackId: item.track.id,
        url: item.track.external_urls.spotify,
        title: item.track.name
      }
    })

    const artistInfo = await fetchArtists(tracks.map(t => t.artistId))
    const tracksWithGenre = tracks.map((track, i) => {
      return { ...track, genres: artistInfo.artists[i].genres }
    })

    const genreFrequencies = frequencies(artistInfo.artists.reduce((a, c) => a.concat(c.genres), []))

    callback(null, { tracks: tracksWithGenre, genres: genreFrequencies })
  } catch (err) {
    console.error('failed fetching playlist', err)
    callback(err)
  }
}
