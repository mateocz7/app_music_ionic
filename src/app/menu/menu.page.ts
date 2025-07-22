import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  constructor(private navController: NavController,) { }

  ngOnInit() {
  }

  logout() {
  // Aquí va tu lógica de cierre de sesión
  console.log('Sesión cerrada');
  this.navController.navigateRoot('/login'); // ejemplo de redirección
}

closeMenu() {
  const menu = document.querySelector('ion-menu');
  if (menu) {
    (menu as any).close().then(() => {
      (document.activeElement as HTMLElement)?.blur(); // ✅ quita el focus correctamente
    });
  }
}



}
