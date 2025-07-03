import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RutasService } from '../../../services/rutas.service';
import { Router, RouterModule } from '@angular/router';
import { Rutas } from '../../../models/rutas';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-crear-ruta-desde-mapa',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, CommonModule, GoogleMapsModule],
  templateUrl: './crear-ruta-desde-mapa.component.html',
  styleUrl: './crear-ruta-desde-mapa.component.css'
})
export class CrearRutaDesdeMapaComponent  implements OnInit{

    form!: FormGroup;
  markerPosition = { lat: -12.0464, lng: -77.0428 }; // Por defecto Lima
  zoom = 14;
  center = { lat: -12.0464, lng: -77.0428 };

  constructor(
    private fb: FormBuilder,
    private rutaService: RutasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreRuta: ['', Validators.required],
      inicio: ['', Validators.required],
      destino: ['', Validators.required],
      distanciaMetros: ['', Validators.required],
      tiempoRuta: ['', Validators.required]
    });
  }

  actualizarPosicion(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    }
  }

  guardarRuta(): void {
    if (this.form.valid) {
      const nuevaRuta: Rutas = {
        ...this.form.value,
        longitud: this.markerPosition.lng,
        latitud: this.markerPosition.lat,
        favorito: false,
        usuario: { idUsuario: 1 } // OBTÉN ESTO DEL TOKEN si es necesario
      };

      this.rutaService.insert(nuevaRuta).subscribe(() => {
        this.rutaService.list().subscribe(data => {
          this.rutaService.setList(data);
        });
        this.router.navigate(['/rutas']);
      });
    }
  }
}
