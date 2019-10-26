import { fetchPlaylist } from '../adapters/spotify'

export const fetchPlaylistInformation = (playlistId, callback) => {
  fetchPlaylist(playlistId, (err, rawPlaylist) => {
    const results = rawPlaylist.tracks.items.map((item) => {
      const title = item.track.name
      return {
        artists: item.track.artists.map((i) => i.name),
        artistId: item.track.artists[0].id,
        title
      }
    })

    callback(err, { clean: results, original: rawPlaylist })
  })
}
