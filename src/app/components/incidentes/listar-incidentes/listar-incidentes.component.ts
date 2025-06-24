import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { RouterLink } from '@angular/router';
import { IncidentesService } from '../../../services/incidentes.service';
import { Incidente } from '../../../models/incidentes';

@Component({
  selector: 'app-listar-incidentes',
   imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
    RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listar-incidentes.component.html',
  styleUrl: './listar-incidentes.component.css'
})
export class ListarIncidentesComponent implements OnInit{
 dataSource: MatTableDataSource<Incidente> = new MatTableDataSource()

  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c7']

  constructor(private iS: IncidentesService) { }

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    // para actualizar automáticamente
    this.iS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number){
    this.iS.deleteA(id).subscribe(data => {
      this.iS.list().subscribe(data => {
        this.iS.setList(data)
      })
    })
  }}