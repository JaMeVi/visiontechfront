import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ContactoemergenciaService } from '../../../../services/contactoemergencia.service';
import { ContactoEmergencia } from '../../../../../../models/contactoemergencia';

@Component({
  selector: 'app-listar-contactoemergencia',
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listar-contactoemergencia.component.html',
  styleUrl: './listar-contactoemergencia.component.css'
})
export class ListarContactoemergenciaComponent  implements OnInit{
   dataSource: MatTableDataSource<ContactoEmergencia> = new MatTableDataSource()

  displayedColumns: string[] = ['Id','c2','c3','c4','c5','Actualizar','Eliminar']

  constructor(private cS: ContactoemergenciaService, private router:Router) { }


  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
    this.cS.deleteA(id).subscribe(() => {
    // Una vez eliminado correctamente en backend, actualizamos la lista
    this.cS.list().subscribe(data => {
      this.cS.setList(data);
    });
  });
}

}
