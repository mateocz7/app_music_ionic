import { Injectable } from '@angular/core';
import { CanActivate,Router  } from '@angular/router';
import { StorageService } from '../services/storage.service'; 

@Injectable({
  providedIn: 'root'
})

export class introGuard implements CanActivate {

  constructor(private storageService: StorageService,private router: Router) {}

  async canActivate(): Promise<boolean> {
    const validateIntro = (await this.storageService.get('validateIntro')) === null ? false : true;

    if (!validateIntro) {
      this.router.navigate(['/intro']);
    }

    return validateIntro
  }
}
