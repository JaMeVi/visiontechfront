import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  
  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // Opcional: Redirigir automáticamente después de 5 segundos
    setTimeout(() => {
      this.goHome();
    }, 5000);
  }

  goHome() {
    this.router.navigate(['/homes']);
  }

  goBack() {
    this.location.back();
  }
}