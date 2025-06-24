import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../models/usuarios';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarusuarios',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
    MatIconModule, RouterLink],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent  implements OnInit {
  
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5', 'c6','c7', 'c8']

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
