import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CEmergencia } from '../../../models/contactoemergencia';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';


@Component({
  selector: 'app-listar-contactos-emergencia',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
   //RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listar-contactos-emergencia.component.html',
  styleUrl: './listar-contactos-emergencia.component.css'
})
export class ListarContactosEmergenciaComponent implements OnInit {

 dataSource: MatTableDataSource<CEmergencia> = new MatTableDataSource()

  displayedColumns: string[] = ['c1','c2','c3','c4','c5']

  constructor(private ceS: ContactoemergenciaService) { }

  ngOnInit(): void {
    this.ceS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    // para actualizar automáticamente
    this.ceS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number){
    this.ceS.deleteA(id).subscribe(data => {
      this.ceS.list().subscribe(data => {
        this.ceS.setList(data)
      })
    })
  }
}
