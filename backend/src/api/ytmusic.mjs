import {
  searchArtists,
  searchMusics,
  searchAlbums,
  listMusicsFromAlbum,
} from "node-youtube-music";

async function searchArtist(artist) {
  const artists = await searchArtists(artist);
  return artists[0];
}

export async function searchMusic(title) {
  const music = await searchMusics(title);
  // 
  let musicData = [
    music[0].title,
    music[0].artists[0].name,
    music[0].album,
    music[0].duration.totalSeconds,
    music[0].youtubeId,
    music[0].thumbnailUrl,
  ];
  
  return musicData;
}

searchMusic("fortnight")

async function searchAlbum(album) {
  const albums = await searchAlbums(album);
  return albums[0].albumId;
}

// requires id passed from searchAlbum
//! gives a typeerror
async function listAlbumSongs(albumId) {
  const albumSongs = await listMusicsFromAlbum(albumId);
  console.log(albumSongs);
  return albumSongs;
}

//!search album works then gives an error at listAlbumSongs
/**
searchAlbum("the tortured poets department").then((res) => {
  listAlbumSongs(res);
});
*/

/**
searchMusic("rick astley never gonna give you up").then((res) =>
  console.log(res)
);
*/
