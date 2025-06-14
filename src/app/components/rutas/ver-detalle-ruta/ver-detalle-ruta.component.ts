import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaService } from '../../../services/ruta.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-ver-detalle-ruta',
  imports: [ MatIconModule],
  templateUrl: './ver-detalle-ruta.component.html',
  styleUrls: ['./ver-detalle-ruta.component.css']
})
export class VerDetalleRutaComponent implements OnInit {
  ruta: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.rutaService.listId(id).subscribe(data => {
      this.ruta = data;
    });
  }

  volver(): void {
    this.router.navigate(['/rutas']);
  }
}