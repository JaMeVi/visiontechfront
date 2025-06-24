import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Recomendaciones } from '../../../models/recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';

@Component({
  selector: 'app-listar-recomendaciones',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
   // RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listar-recomendaciones.component.html',
  styleUrl: './listar-recomendaciones.component.css'
})
export class ListarRecomendacionesComponent {
dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2','c3', 'c4']

  constructor(private rS: RecomendacionesService) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    // para actualizar automáticamente
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number){
    this.rS.deleteA(id).subscribe(data => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data)
      })
    })
  }
}



