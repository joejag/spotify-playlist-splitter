import { fetchPlaylist } from '../adapters/spotify'

// https://www.reddit.com/r/indieheads/comments/deja9p/pitchfork_the_200_best_songs_of_the_2010s/
// Target: https://open.spotify.com/playlist/16FzcfDid0m2i2EttomvSR?si=2x1eFR1ZTOuT_jjcPekDIg

export const go = (callback) => {
  fetchPlaylist('16FzcfDid0m2i2EttomvSR', (err, rawPlaylist) => {
    const firstTrack = rawPlaylist.tracks.items[0].track
    const firstArtist = firstTrack.artists[0].name
    const title = firstTrack.name

    callback(err, { clean: [{ artists: firstArtist, title }], original: rawPlaylist })
  })
}
