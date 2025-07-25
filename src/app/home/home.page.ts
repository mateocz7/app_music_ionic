import { Component,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, ModalController } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { CatalogService } from '../services/core/catalog.service';
import { Router } from '@angular/router';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{
  /*colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;*/

  tracks: any[] = [];
  albums: any[] = [];
  localArtist: any;
  validateIntro = false;
  generes = [
    {
      title:"Musica Clasica",
      image:"https://formacioncatolica.org/wp-content/uploads/Articulo-Musica-Clasica-Cuarteto-1.jpg.webp",
      description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
    title: "Rock",
    image: "https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291_1280.jpg ",
    description: "El rock es un género musical que se desarrolló durante y después de la década de 1950, caracterizado por un ritmo fuerte y el uso prominente de guitarras eléctricas."
    },
    {
      title: "Jazz",
      image: "https://flowmag.com/wp-content/uploads/2021/04/dia-internacional-del-jazz-en-el-rvbicon.jpg",
      description: "El jazz es un género musical nacido en Estados Unidos a finales del siglo XIX, conocido por su improvisación, ritmo swing y una gran expresividad instrumental."
    }
  ]
    constructor(private storageService : StorageService, private router : Router, private catalogService: CatalogService,
      private modalController: ModalController
    ) {}

    async ngOnInit() {
      await this.loadStorageData();
      this.loadAlbums();
      this.getLocalArtists();
    }

    loadTracks(){
        this.catalogService.getTracks().then(tracks => {
        this.tracks = tracks;
        console.log(this.tracks, 'las canciones');
      });
    }

    loadAlbums(){
        this.catalogService.getAlbums().then(albums => {
        this.albums = albums;
        console.log(this.albums, 'Los albunes');
      });
    }

    /*async cambiarColor(){
      this.colorActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro;
      await this.storageService.set('theme',this.colorActual);
    }*/

    async loadStorageData(){
      const validateIntro = (await this.storageService.get('validateIntro')) === null ? false : true;
      console.log("ya entre al intro ? ",validateIntro) 
    }

    goBackIntro(){
      this.router.navigateByUrl("/intro")
      console.log("YA fue al intro? " , this.validateIntro);
    }

    goBackLogin(){
      this.router.navigateByUrl("/login")
      console.log("Ya fue al intro? " , this.validateIntro);
    }

    getLocalArtists(){
      this.localArtist = this.catalogService.getLocalArtists;
      console.log('Artistas: ', this.localArtist.artistas)
    }

    async showSongs(albumId: string){
      console.log('albumId: ',albumId)
      const songs = await this.catalogService.getSongByAlbumId(albumId);
      console.log('songs: ',songs)
      const modal = await this.modalController.create({
        component:SongsModalPage,
        componentProps:{
          songs
        }
      })
      modal.present();
    }
}


