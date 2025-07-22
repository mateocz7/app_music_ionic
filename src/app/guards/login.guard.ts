import { Injectable } from '@angular/core';
import { CanActivate,Router  } from '@angular/router';
import { StorageService } from '../services/storage.service'; 

@Injectable({
  providedIn: 'root'
})

export class loginGuard implements CanActivate {

  constructor(private storageService: StorageService,private router: Router) {}

  async canActivate(): Promise<boolean> {
    const validateLogin = (await this.storageService.get('validateLogin')) === null ? false : true;

    if (!validateLogin) {
      this.router.navigate(['/login']);
    }

    return validateLogin
  }
}
