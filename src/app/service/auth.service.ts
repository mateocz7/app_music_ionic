import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(credentials: any){
    return new Promise((accept, reject) => {
      if (
        credentials.email == "luisdanielesq7@gmail.com" &&
        credentials.password == "123456789"
      ) {
        accept("login correcto")
      }else(
        reject("login incorrecto")
      )
    })
  }

  registerUser(user: any) {
    return new Promise((accept, reject) => {
      if (
        user?.nombre?.trim() &&
        user?.apellido?.trim() &&
        user?.email?.trim() &&
        user?.password?.trim()
      ) {
        accept("registro correcto");
      } else {
        reject("Todos los campos son requeridos.");
      }
    });
  }



}
