import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { Recomendacion } from '../../../models/recomendacion';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-recomendaciones',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './listar-recomendaciones.component.html',
  styleUrl: './listar-recomendaciones.component.css'
})
export class ListarRecomendacionesComponent implements OnInit{
  dataSource: MatTableDataSource<Recomendacion> = new MatTableDataSource()

  displayedColumns: string[] = ['ID','Comentario','Puntuacion','Eliminar','Actualizar']

  constructor(private rS: RecomendacionesService) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
  }
  eliminar(id:number){
    this.rS.list().subscribe(data=>{
      this.rS.setList(data)
    })
}
}
  


