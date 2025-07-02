import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
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
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  
  rol: string = '';
  
  // Propiedades para el menú lateral
  isMenuOpen: boolean = false;
  openSubmenus: { [key: string]: boolean } = {};

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.cargarRol();
  }

  cargarRol() {
    const rolFromService = this.loginService.showRole();
    console.log('Rol obtenido del servicio:', rolFromService);
    this.rol = rolFromService || '';
    console.log('Rol asignado al componente:', this.rol);
  }

  cerrar() {
    this.loginService.logout();
  }

  verificar(): boolean {
    const isAuthenticated = this.loginService.verificar();
    if (isAuthenticated && !this.rol) {
      // Si está autenticado pero no hay rol cargado, intentar cargarlo
      this.cargarRol();
    }
    return isAuthenticated;
  }

  isDeveloper(): boolean {
    return this.loginService.hasRole('DEVELOPER');
  }

  isTester(): boolean {
    return this.loginService.hasRole('TESTER');
  }

  // Métodos para el menú lateral
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    // También cerrar todos los submenús cuando se cierra el menú principal
    this.openSubmenus = {};
  }

  toggleSubmenu(submenuKey: string): void {
    this.openSubmenus[submenuKey] = !this.openSubmenus[submenuKey];
  }
}