import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    MatMenuModule,
    MatButtonModule, 
    MatToolbarModule,
    MatIconModule, 
    CommonModule,
    RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
rol: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    
    sessionStorage.clear();
  }

  verificar() {
    this.rol = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isDeveloper() {
    return this.rol === 'DEVELOPER';
  }

  isTester() {
    return this.rol === 'TESTER';
  }
}

