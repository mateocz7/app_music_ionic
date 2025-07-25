import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router'
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {

  bgColor = 'var(--bg-color)';
  titleColor = 'var(--title-color)';
  textColor = 'var(--text-color)';

 introSliders = [
  {
    title: 'Encuentra los mejores músicos en tu ciudad',
    description: 'Miles de músicos cerca de ti están listos para darle ritmo a tu evento.',
    image: 'assets/images/music1.jpg'
  },
  {
    title: 'La forma más rápida de contratar artistas increíbles',
    description: 'Encuentra la opción perfecta para hacer de tu evento algo inolvidable.',
    image: 'assets/images/music2.jpg'
  },
  {
    title: 'Contrata profesionales top para tu próximo evento',
    description: 'Haz que tu celebración se destaque con músicos verdaderamente talentosos.',
    image: 'assets/images/music3.jpeg'
  },

  {
    title: 'La forma más rápida de contratar artistas increíbles',
    description: 'Encuentra la opción perfecta para hacer de tu evento algo inolvidable.',
    image: 'assets/images/music2.jpg'
  },
];


  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl("/home")
    //al volver atras o volver al home guardar en el storage que ya estuve o vi la pagina de intro
  }


  async goHome() {
    try {
      await this.storageService.set('validateIntro', true);
      console.log('Intro marcada como vista');
      this.router.navigateByUrl('/menu/home');
    } catch (error) {
      console.error('Error guardando en el storage:', error);
    }
  }

}
