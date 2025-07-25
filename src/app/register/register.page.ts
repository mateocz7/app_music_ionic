import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { IonContent, IonicModule, NavController, IonToolbar, IonItem } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  borderRadius = 'var(--input-border-radius)';
  titleColor = 'var(--title-color)';
  colorNegro = 'var(--color-negro)';
  errorMenssage: string = "";

  validation_messages = {
    nombre: [
      {
        type: "required", mensaje: "El nombre es obligatorio."
      }
    ],
    apellido: [
      {
        type: "required", mensaje: "El apellido es obligatorio."
      }
    ],
    email: [
      {
        type: "required", mensaje: "El email es obligatorio."
      },
      {
        type: "email", mensaje: "Email invalido."
      }
    ],
    password: [
      {
        type: "required", mensaje: "La contraseña es obligatoria."
      },
      {
        type: "minLength", mensaje: "Contraseña invalida."
      }
    ]
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController, private storageService: StorageService) {
     this.registerForm = this.formBuilder.group({
      nombre: new FormControl(
        '', Validators.compose([
          Validators.required
        ])
      ),
      apellido: new FormControl(
        '', Validators.compose([
          Validators.required
        ])
      ),
      email: new FormControl(
        '', Validators.compose([
        Validators.required, //Campo obligatorio
        Validators.email //Valida que sea correo electronico
      ])
    ),
      password: new FormControl('', Validators.compose([
        Validators.required,//Campo obligatorio
        Validators.minLength(6)
      ])
    )
    });
  }

  ngOnInit() {
  }

  registerUser(user: any) {
    console.log('Datos del usuario:', user);

    this.authService.registerUser(user).then(res => {
      this.errorMenssage = "";
      console.log(res);

      try {
        this.storageService.set('credenciales', {
          name: user.nombre,
          lastName: user.apellido,
          email: user.email,
          password: user.password
        });

        this.navCtrl.navigateForward("/login");

      } catch (error) {
        console.error('Error al guardar en el storage:', error);
      }

    }).catch(error => {
      this.errorMenssage = error;
      console.warn('Error de registro:', error);
    });
  }

  goLogin() {
    this.router.navigateByUrl("/login")
  }


}
