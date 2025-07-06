import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const adminRoleGuard = () => {
  const lService = inject(LoginService);
  const router = inject(Router);

  // Primero verificar si está autenticado
  const isAuthenticated = lService.verificar();
  
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  // Luego verificar si tiene rol de administrador
  const hasAdminRole = lService.hasRole('ROLE_ADMIN');
  
  if (!hasAdminRole) {
    // Redirigir a la página de acceso denegado
    router.navigate(['/access-denied']);
    return false;
  }

  return true;
};