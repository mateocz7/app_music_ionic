import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})


export class IntroGuard implements CanActivate {

  constructor(private storageService: StorageService,private router: Router) {}

  async canActivate(): Promise<boolean> {
    const validateIntro = (await this.storageService.get('validateIntro')) === null ? false : true;
    if (!validateIntro) {
      this.router.navigate(['/intro']);
    }

    return validateIntro
  }
}
