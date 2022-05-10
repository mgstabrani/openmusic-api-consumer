const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
    FROM playlists
    LEFT JOIN users ON users.id = playlists.owner
    WHERE playlists.id = $1`,
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlists, songs, playlist_songs
      WHERE playlists.id = $1 AND playlist_songs.song_id = songs.id AND playlists.id = playlist_songs.playlist_id`,
      values: [playlistId],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistsService;
