import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';
import { MusicService } from '../service/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit{
  temaOscuro = true;

  colorFondo = 'var(--color-dark-bg-ioncontent)';
  colorTexto = 'var(--color-dark-text-card)';
  colorTitulo = 'var(--color-dark-title-card)';
  colorCard = 'var(--color-oscuro)';
  colorOscuro = 'var(--color-dark-title-card)';
  colorClaro = 'var(--color-dark-bg-ioncontent)'
  colorVerde = 'var(--color-dark-title-card)';

  colorActual = this.colorOscuro;

  //[Tarea]: Agregar infromacion de minimo 3 slides para mostrar en la vista
  //[Tarea]: Cambiar mediante el click de un boton el tema (color) de los slides
  genres = [
    {
      title: 'Música Clásica',
      image:
        'https://wallpapers.com/images/featured/musica-clasica-a58kbdl0oe9y9hxf.jpg',
      description:
        'La música clásica es una forma de arte refinada que abarca siglos de tradición y expresión emocional profunda. Es interpretada por orquestas, coros y solistas de todo el mundo.',
    },
    {
      title: 'Rock',
      image:
        'https://www.ifema.es/img/xl/grupo-rock-roll/grupo-rock-and-roll.jpeg',
      description:
        'El rock es un género potente y enérgico que ha marcado generaciones. Con guitarras eléctricas, baterías contundentes y letras poderosas, el rock nunca pasa de moda.',
    },
    {
      title: 'Jazz',
      image:
        'https://static.wikia.nocookie.net/los-generos-musicales/images/4/4f/Dixie_Jazz_5.jpg/revision/latest?cb=20210120233726&path-prefix=es',
      description:
        'El jazz es sinónimo de improvisación y libertad. Con raíces afroamericanas, este género mezcla ritmos complejos y melodías envolventes que transmiten alma y pasión.',
    },
  ];

  tracks: any;
  albums: any;
  localArtists: any;
  artists: any;
  song: any = {
    name: "",
    preview_url: "",
    playing: false,
    liked: false
  };
  currentSong: any;
  newTime: any;

  constructor(private router: Router, private storageService: StorageService, private musicService: MusicService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    /* const introVisto = await this.storageService.get('VioElIntro');
    if (!introVisto) {
      this.router.navigateByUrl('/intro');
      return;
    } */

      const validateIntro = (await this.storageService.get('validateIntro')) === null ? false : true;
      console.log("ya entre al intro ? ",validateIntro)

    await this.loadStorageData();
 /*    this.simularCargaDatos(); */
    this.loadTracks();
    this.loadAlbums();
    this.getLocalArtists();
    this.loadArtist();
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log(this.tracks, "Las Canciones")
    })
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
      console.log(this.albums, "Las Albums")
    })
  }

  async cambiarColorDos () {
    this.colorActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro;
    console.log(this.colorActual)
    await this.storageService.set('theme', this.colorActual)
    console.log('Tema Guardado: ', this.colorActual)
  }

  cambiarColor() {
    this.temaOscuro = !this.temaOscuro;
    //if ternarios
    this.colorFondo = this.temaOscuro
      ? 'var(--color-dark-bg-ioncontent)'
      : 'var(--color-light-bg-ioncontent)';

    this.colorTexto = this.temaOscuro
      ? 'var(--color-dark-text-card)'
      : 'var(--color-light-text-card)';

    this.colorTitulo = this.temaOscuro
      ? 'var(--color-dark-title-card)'
      : 'var(--color-light-title-card)';

    this.colorCard = this.temaOscuro
      ? 'var(--color-oscuro)'
      : 'var(--color-claro)';
  }

  async loadStorageData() {
    const saveTheme = await this.storageService.get('theme');
    if (saveTheme) {
      this.colorActual = saveTheme;
      console.log('color: ', this.colorActual)
    }
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados: ', data)
  }

  obtenerDatosSimulados() {
    return new Promise((resolver, reject) => {
      setTimeout(() => {
       // resolver(['Rock', 'Poop', 'Jazz'])
       reject("Hubo un error al obtener los datos")
      }, 1500)
    })
  }

  getLocalArtists() {
    this.localArtists = this.musicService.getLocalArtists();
   /*  console.log("Artistas",this.localArtists.artists) */
  }

  async showSongs(albumId: string) {
    console.log("album id:", albumId)
    const songs = await this.musicService.getSongsByAlbum(albumId);
    console.log("song :", songs)
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result)=> {
      if (result.data) {
        console.log("Cancion recibida:", result.data)
        this.song = result.data
      }
    })
    modal.present();
  }

  loadArtist() {
    this.musicService.getArtists().then(artists => {
      this.artists = artists;
      console.log("Los aristas:" ,this.artists)
    })
  }

  async showSongsByArtist(artistId: string) {
    console.log("artista id", artistId)
    const songs = await this.musicService.getSongByArtists(artistId);
    console.log("songArtist", songs)
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result)=> {
      if (result.data) {
        console.log("Cancion recibida:", result.data)
        this.song = result.data
      }
    })
    modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime = (this.currentSong.currentTime * (this.currentSong.duration / 10)) / 100;
    })
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds/60);
    const remainingSeconsds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconsds.toString().padStart(2, '0')}`
  }

  getRemainingTime() {
    if (!this.currentSong?.duration || !this.currentSong?.currentTime) {
      return 0;
    }
    return this.currentSong.duration - this.currentSong.currentTime;
  }

  toggleLike() {
    if (this.song?.name) {
      this.song.liked = !this.song.liked;
    } else {
      console.log("No hay canción seleccionada para dar like.");
    }
  }

  //Crear funcion para ir a ver la intro, se va a conectar con un boton
  // que debemos agregar en el html y  al hacer click ejecute esat funcion para llevarme a ver la intro
}
