import { Injectable } from '@angular/core';
import * as daraArtists from './artistas.json'

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = "https://music.fly.dev"

  constructor() { }

  getTracks() {
    return fetch(`${this.urlServer}/tracks`).then(
      response => response.json()
    );
  }

  getAlbums() {
    return fetch(`${this.urlServer}/albums`).then(
      response => response.json()
    );
  }

  getArtists() {
   return fetch(`${this.urlServer}/artists`).then(
      response => response.json()
    );
  }

  getLocalArtists() {
    return daraArtists.artists;
  }

  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(
      response => response.json()
    );
  }

  getSongByArtists(artistId: string) {
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`).then(
      response => response.json()
    );
  }
}
