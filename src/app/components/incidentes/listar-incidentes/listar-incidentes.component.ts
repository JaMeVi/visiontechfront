import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { IncidenteService } from '../../../services/incidente.service';
import { Incidente } from '../../../models/incidente';

@Component({
  selector: 'app-listar-incidentes',
  imports: [MatTableModule,CommonModule, MatButtonModule, RouterLink ,MatIconModule],
  templateUrl: './listar-incidentes.component.html',
  styleUrl: './listar-incidentes.component.css'
})
export class ListarIncidentesComponent {
  dataSource: MatTableDataSource<Incidente> = new MatTableDataSource()

  displayedColumns: string[] = ['ID', 'Tipo', 'Gravedad', 'Descripcion','Eliminar','Actualizar']

  constructor(private iS: IncidenteService) { }

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.iS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
    this.iS.deleteA(id).subscribe(() =>{

    this.iS.list().subscribe(data=>{
      this.iS.setList(data);
    })
})
}

}
