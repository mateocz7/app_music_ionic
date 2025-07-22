import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService : StorageService) { }

  async loginUser(credentials: any): Promise<string> {
  if (credentials.email === 'andres@gmail.com' && credentials.password === '12345') {
    await this.storageService.set('validateLogin',true);
    return 'Validación exitosa';
  } else {
    throw 'Error en las credenciales';
  }
}
}
