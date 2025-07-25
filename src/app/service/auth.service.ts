// src/app/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://music.fly.dev';

  constructor(private http: HttpClient) {}

loginUser(credentials: any): Promise<any> {
  const body = {
    user: {
      email: credentials.email,
      password: credentials.password
    }
  };

  return this.http.post(`${this.baseUrl}/login`, body).toPromise()
    .catch(error => {
      const msg = error?.error?.errors?.["email or password"]?.[0] || "Error al iniciar sesión.";
      return Promise.reject(msg);
    });
}


  registerUser(user: any): Promise<any> {
    const body = {
      user: {
        email: user.email,
        password: user.password,
        name: user.nombre + ' ' + user.apellido,
        username: user.nombre?.toLowerCase()
      }
    };
    return this.http.post(`${this.baseUrl}/signup`, body).toPromise();
  }
}
