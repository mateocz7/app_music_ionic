import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {
  bgFondo = 'var(--bg-color)';
  titleColor= 'var(--title-color)';
  buttonClass = 'custom-button';

  intro = [
    {
      image:"/assets/images/intro/slide1.png",
      title:"Listen Anywhere",
      description:"Favorite tunes follow, anytime, anywhere. Worry-free offline playback for your journey."
    },
    {
      image:"/assets/images/intro/slide2.png",
      title:"Playback",
      description:"Pristine sound quality for absolute clarity in audio playback."
    },
    {
      image:"/assets/images/intro/slide3.png",
      title:"Music For You",
      description:"Curated weekly playlists tailored to your music listening history."
    }
  ]

  constructor(private router: Router,private storageService : StorageService) { }

  ngOnInit() {
  }

  async goBack(){
    await this.storageService.set('validateIntro',true);
    this.router.navigateByUrl("/home");
  }

}
