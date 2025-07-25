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
      title: 'Find Best Musicians All Around Your City',
      description: 'Thousands of musicians around you are waiting to rock your event.',
      image: 'assets/images/men_guitar.png'
    },
    {
      title: 'Fastest Way To Book Great Musicians',
      description: 'Find the perfect match to perform for your event and make the day remarkable.',
      image: 'assets/images/woman_singing.png'
    },
    {
      title: 'Find Top Sessions Pros For Your Event',
      description: 'Find the perfect match to perform for your event and make the day remarkable.',
      image: 'assets/images/image.png'
    }
  ]

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
