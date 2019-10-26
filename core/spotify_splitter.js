import { fetchPlaylist, fetchArtists } from '../adapters/spotify'

export const fetchPlaylistInformation = async (playlistId, callback) => {
  try {
    const rawPlaylist = await fetchPlaylist(playlistId)
    const tracks = rawPlaylist.tracks.items.map((item) => {
      return {
        artists: item.track.artists.map((i) => i.name),
        artistId: item.track.artists[0].id,
        title: item.track.name
      }
    })

    const artistIds = tracks.map(t => t.artistId)
    const artistInfo = await fetchArtists(artistIds)
    const result = tracks.map(function (e, i) {
      return { ...e, genres: artistInfo.artists[i].genres }
    })

    callback(null, { clean: result, original: rawPlaylist })
  } catch (err) {
    console.error('failed fetching playlist', err)
    callback(err)
  }
}
