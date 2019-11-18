import { fetchPlaylist, fetchArtists } from '../adapters/spotify'
import { frequencies } from './arrays'

export const fetchPlaylistInformation = async (playlistId, callback) => {
  try {
    const rawPlaylist = await fetchPlaylist(playlistId)
    const tracks = rawPlaylist.items.map((item) => {
      return {
        title: item.track.name,
        artists: item.track.artists.map((i) => i.name),
        artistId: item.track.artists[0].id,
        trackId: item.track.id,
        releaseYear: (item.track.album.release_date + '').split('-')[0],
        url: item.track.external_urls.spotify
      }
    })

    const artistInfo = await fetchArtists(tracks.map(t => t.artistId))
    const tracksWithGenre = tracks.map((track, i) => {
      return { ...track, genres: artistInfo.artists[i].genres }
    })

    const genreFrequencies = frequencies(artistInfo.artists.reduce((a, c) => a.concat(c.genres), []))
    const yearFrequencies = frequencies(tracks.map(t => t.releaseYear), [])

    callback(null, { tracks: tracksWithGenre, genres: genreFrequencies, years: yearFrequencies })
  } catch (err) {
    console.error('failed fetching playlist', err)
    callback(err)
  }
}
