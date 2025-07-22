import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  ToastController,
  NavController,
  IonInput,
  IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonItem, 
    IonButton,
    IonContent,
    IonInput,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  bgFondo = 'var(--bg-color)';
  errorMessage: string = '';

  validation_messages = {
    nombres: [
      { type: 'required', message: 'El nombre es obligatorio.' },
      {
        type: 'minlength',
        message: 'El nombre debe tener al menos 3 caracteres.',
      },
    ],
    apellidos: [
      { type: 'required', message: 'Los apellidos sib obligatorios.' },
      {
        type: 'minlength',
        message: 'Los apellidos deben tener al menos 4 caracteres.',
      },
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Debes ingresar un email válido.' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      {
        type: 'minlength',
        message: 'La contraseña debe tener al menos 6 caracteres.',
      },
    ],
  };

  constructor(
    private navController: NavController,
    private fromBuilder: FormBuilder,
    private toastController: ToastController,
    private storageService: StorageService,
    private router : Router
  ) {
    this.registerForm = this.fromBuilder.group({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async registerUser(credentials: any) {
    try {
      this.errorMessage = '';

      // Guardar usuario en Storage
      await this.storageService.set('registeredUser', credentials);

      // Guardar flag de login (para activar guard)
      await this.storageService.set('validateLogin', true);

      // Redirigir al home
      this.navController.navigateForward('/home');
    } catch (error) {
      this.presentErrorToast('Ocurrió un error al registrar el usuario.');
      console.log('Error al registrar:', error);
    }
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass: 'toast-error',
    });
    await toast.present();
  }

  ngOnInit() {}

  goToLogin(){
    this.router.navigateByUrl("/login")
  }
}
