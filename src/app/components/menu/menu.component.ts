import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    MatMenuModule,
    MatButtonModule, 
    MatToolbarModule,
    MatIconModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    
    if (this.isMenuOpen) {
      navLinks.classList.add('active');
    } else {
      navLinks.classList.remove('active');
    }
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.remove('active');
  }

}
