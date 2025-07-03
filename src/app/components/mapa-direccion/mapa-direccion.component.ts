import { Component, OnInit, ViewChild } from '@angular/core';
import { GeolocalizacionService } from '../../services/geolocalizacion.service';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps'; // ✅ AÑADE ESTO
import { Rutas } from '../../models/rutas';
import { RutasService } from '../../services/rutas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa-direccion',
  imports: [GoogleMapsModule ,CommonModule, FormsModule],
  templateUrl: './mapa-direccion.component.html',
  styleUrl: './mapa-direccion.component.css'
})
export class MapaDireccionComponent  implements OnInit{
 rutas: Rutas[] = [];
  marcadores: { lat: number; lng: number; label: string; info: string }[] = [];

  center: { lat: number; lng: number } = { lat: -12.0464, lng: -77.0428 };
  zoom = 12;

   nuevaPosicion: { lat: number; lng: number } | null = null;

  nuevaRuta: any = {
    nombreRuta: '',
    inicio: '',
    destino: '',
    distanciaMetros: 0,
    tiempoRuta: 0
  };

  selectedInfo = '';

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(
    private geoService: GeolocalizacionService,
    private rutasService: RutasService
  ) {}

  ngOnInit(): void {
    this.rutasService.list().subscribe((data) => {
      this.rutas = data;

      this.rutas.forEach((ruta) => {
        this.geoService.getCoordinates(ruta.inicio).subscribe((resp) => {
          if (resp.status === 'OK') {
            const location = resp.results[0].geometry.location;

            const infoTexto = `
              🛣️ <strong>${ruta.nombreRuta}</strong><br>
              📍 Inicio: ${ruta.inicio}<br>
              🎯 Destino: ${ruta.destino}<br>
              📏 Distancia: ${ruta.distanciaMetros}m<br>
              ⏱️ Tiempo: ${ruta.tiempoRuta}min
            `;

            this.marcadores.push({
              lat: location.lat,
              lng: location.lng,
              label: ruta.nombreRuta || '',
              info: infoTexto
            });
          }
        });
      });
    });
  }

   onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.nuevaPosicion = { lat, lng };

      // También puedes autocompletar la dirección si quieres usando geocoding
      console.log('🆕 Clic en:', lat, lng);
    }
  }

    registrarRuta() {
    const nueva = {
      ...this.nuevaRuta,
      latitud: this.nuevaPosicion?.lat,
      longitud: this.nuevaPosicion?.lng,
      favorito: false, // Por defecto
      usuario: { idUsuario: 1 } // 👈 Cambia por el usuario real si tienes login
    };

    this.rutasService.insert(nueva).subscribe(() => {
      alert('✅ Ruta registrada');
      this.nuevaRuta = {
        nombreRuta: '',
        inicio: '',
        destino: '',
        distanciaMetros: 0,
        tiempoRuta: 0
      };
      this.nuevaPosicion = null;
      this.ngOnInit(); // Recarga las rutas
    });
  }

 openInfo(m: any, marker: any) {
  this.selectedInfo = m.info;
  this.infoWindow.open(marker);
}
}
