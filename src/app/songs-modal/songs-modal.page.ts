import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon , NavParams } from '@ionic/angular/standalone';
import { CatalogService } from '../services/core/catalog.service';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,IonIcon]
})
export class SongsModalPage implements OnInit {

  songs: any
  albumImage: string = '';
  constructor(private navParams: NavParams,private catalogService: CatalogService) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs']
    if (this.songs?.length > 0) {
      const artistId = this.songs[0].artist_id;
      this.getArtist(artistId);
    }
    console.log('song desde el modal', this.songs)
  }

  activeSongId: number | null = null;
  audio = new Audio();

  playPreview(song: any) {
    if (this.activeSongId === song.id) {
      this.audio.pause();
      this.activeSongId = null;
    } else {
      this.audio.src = song.preview_url;
      this.audio.play();
      this.activeSongId = song.id;
    }
  }

  getMinutes(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  playSong(song: any) {
    if (this.activeSongId === song.id) {
      this.audio.pause();
      this.activeSongId = null;
    } else {
      this.audio.pause(); // Detiene el anterior
      this.audio = new Audio(song.preview_url);
      this.audio.play();
      this.activeSongId = song.id;
    }
  }

  artistName: string = '';

  getArtist(artistId: number) {
    this.catalogService.getArtistById(artistId).then((artist) => {
      this.albumImage = artist.image;
      this.artistName = artist.name;
    }).catch((error) => {
      console.error('Error al obtener el artista:', error);
    });
  }


}
