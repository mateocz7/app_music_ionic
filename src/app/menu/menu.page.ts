import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class MenuPage implements OnInit {

  constructor(private menu: MenuController, private storageService: StorageService, private navCtrl: NavController) {}

  ngOnInit() {
  }

  async logOut() {
    await this.storageService.clear();
    this.navCtrl.navigateRoot('/login');
  }

  goIntro() {
    console.log("Ir hacia la intro")
  }

  closeMenu() {
    this.menu.close();
  }
}

