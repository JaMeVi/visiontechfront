import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-rutas',
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './listar-rutas.component.html',
  styleUrl: './listar-rutas.component.css'
})
export class ListarRutasComponent implements OnInit{
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource()

  displayedColumns: string[] = ['Ruta Id', 'Nombre de Ruta', 'Destino', 'Inicio', 'Favorito', 'Distancia en metros','Tiempo de ruta','Longitud','Latitud', 'Acciones']

  constructor(private rS: RutaService) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id: number) {
  this.rS.eliminar(id).subscribe(() => {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  });
}
  

}
