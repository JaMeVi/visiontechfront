import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8083/login', request);
  }

  private isSessionStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof sessionStorage !== 'undefined';
  }

  verificar(): boolean {
    if (!this.isSessionStorageAvailable()) {
      return false;
    }
    
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole(): string | null {
    if (!this.isSessionStorageAvailable()) {
      console.log('SessionStorage no disponible');
      return null;
    }

    let token = sessionStorage.getItem('token');
    console.log('Token obtenido:', token ? 'Token existe' : 'No hay token');
    
    if (!token) {
      return null;
    }

    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log('Token decodificado:', decodedToken);
      
      // El rol está en el array 'roles', no en 'rol'
      const roles = decodedToken?.roles;
      console.log('Roles array:', roles);
      
      if (roles && Array.isArray(roles) && roles.length > 0) {
        // Tomar el primer rol del array
        const rol = roles[0];
        console.log('Rol extraído:', rol);
        return rol;
      }
      
      return null;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  logout(): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.clear();
    }
  }

  // Método para guardar el token después del login
  setToken(token: string): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.setItem('token', token);
    }
  }

  // Agregar estos métodos al LoginService si necesitas manejar múltiples roles

showAllRoles(): string[] {
  if (!this.isSessionStorageAvailable()) {
    return [];
  }

  let token = sessionStorage.getItem('token');
  if (!token) {
    return [];
  }

  try {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const roles = decodedToken?.roles;
    
    if (roles && Array.isArray(roles)) {
      return roles;
    }
    
    return [];
  } catch (error) {
    console.error('Error decodificando token:', error);
    return [];
  }
}

hasRole(roleName: string): boolean {
  const roles = this.showAllRoles();
  return roles.includes(roleName);
}
}