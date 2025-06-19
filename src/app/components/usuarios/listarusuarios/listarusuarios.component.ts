import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../models/usuarios';

@Component({
  selector: 'app-listarusuarios',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
   // RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent  implements OnInit {
  
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5', 'c6','c7']

  constructor(private uS: UsuariosService) { }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    // para actualizar automáticamente
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number){
    this.uS.deleteA(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      })
    })
  }
}
