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
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {

  bgColor = 'var(--bg-color)';
  borderRadius = 'var(--input-border-radius)';
  titleColor = 'var(--title-color)';
  loginForm: FormGroup;
  errorMenssage: string = "";
  colorNegro = 'var(--color-negro)';

  validation_messages = {
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
    this.loginForm = this.formBuilder.group({
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

  ngOnInit() {}

  loginUser(credentials: any) {
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMenssage = "";
      try {
        this.storageService.set('login', true);
      } catch (error) {
        console.error('Error guardando en el storage:', error);
      }
      this.navCtrl.navigateForward("/menu/home");
    }).catch(error => {
      this.errorMenssage = error;
    });
  }

  goRegister() {
    this.router.navigateByUrl("/register")
  }
}
