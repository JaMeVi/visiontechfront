import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Temaforo } from '../../../../models/temaforo';
import { TemaforoService } from '../../../../services/temaforo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-temaforo',
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterLink, MatIconModule,],
  templateUrl: './listar-temaforo.component.html',
  styleUrl: './listar-temaforo.component.css'
})
export class ListarTemaforoComponent {
dataSource: MatTableDataSource<Temaforo> = new MatTableDataSource()

  displayedColumns: string[] = ['Id','Titulo','Comentario','FechaCreacion','EstadoCerrado','Actualizar','Eliminar']

  constructor(private tS: TemaforoService, private router:Router) { }


  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.tS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
    this.tS.list().subscribe(data=>{
      this.tS.setList(data)
    })
}

}
