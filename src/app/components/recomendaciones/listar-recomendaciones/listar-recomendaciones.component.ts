import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { Recomendacion } from '../../../models/recomendacion';

@Component({
  selector: 'app-listar-recomendaciones',
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './listar-recomendaciones.component.html',
  styleUrl: './listar-recomendaciones.component.css'
})
export class ListarRecomendacionesComponent implements OnInit{
  dataSource: MatTableDataSource<Recomendacion> = new MatTableDataSource()

  displayedColumns: string[] = ['Recomendacion ID','Comentario','Puntuacion','Id ruta','Acciones']

  constructor(private rS: RecomendacionesService) { }

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
