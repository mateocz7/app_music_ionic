import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SongsModalPage implements OnInit {
  songs: any;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    console.log('recibí: ', this.songs);
  }

  async selectSong(song:any) {
    console.log("Cancion seleccionada: ", song)
    await this.modalCtrl.dismiss(song)
  }
}
