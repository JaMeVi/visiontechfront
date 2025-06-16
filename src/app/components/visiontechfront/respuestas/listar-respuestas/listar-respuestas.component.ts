import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RespuestaService } from '../../../../services/respuesta.service';
import { Respuesta } from '../../../../models/respuesta';

@Component({
  selector: 'app-listar-respuestas',
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listar-respuestas.component.html',
  styleUrl: './listar-respuestas.component.css'
})
export class ListarRespuestasComponent implements OnInit{
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource()

  displayedColumns: string[] = ['Id','Respuesta','IDTEMA','FechaRespuesta','Actualizar','Eliminar']

  constructor(private rS: RespuestaService, private router:Router) { }


  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
    this.rS.deleteA(id).subscribe(() => {
    // Una vez eliminado correctamente en backend, actualizamos la lista
    this.rS.list().subscribe(data => {
      this.rS.setList(data);
    });
  });
}

}
