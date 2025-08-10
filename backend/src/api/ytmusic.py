from ytmusicapi import YTMusic
import json
import sys

ytmusic = YTMusic()

"""
  INDEXES OF MUSIC DATA
   * 0: title
   * 1: artist
   * 2: album
   * 3: duration (seconds)
   * 4: youtubeId
   * 5: thumbnailUrl
"""

def searchMusic(song):
  musicResponse = ytmusic.search(song, filter="songs", limit=1)[0]

  musicData = [
    musicResponse["title"],
    musicResponse["artists"][0]["name"],
    # If no album, use an empty string
    musicResponse.get("album", {}).get("name", ""),
    musicResponse["duration_seconds"],
    musicResponse["videoId"],
    musicResponse["thumbnails"][0]["url"]
  ]
  return json.dumps(musicData)

#! do not remove this
print(searchMusic(sys.argv[1]))