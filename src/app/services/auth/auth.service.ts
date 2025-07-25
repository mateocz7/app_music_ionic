import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://music.fly.dev';

  constructor(private http: HttpClient) {}

  loginUser(credentials: { email: string; password: string }) {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials).pipe(
      tap((response) => {
        console.log('✅ Login response:', response);
      }),
      catchError((error) => {
        console.log('❌ Login error:', error); // Aquí vemos todo el error
        // Si el error viene como { errors: { "email or password": [...] } }
        const errorMsg = error?.error?.errors?.["email or password"]?.[0] || 'Error al iniciar sesión.';
        return throwError(() => errorMsg);
      })
    ).toPromise();
  }
}
