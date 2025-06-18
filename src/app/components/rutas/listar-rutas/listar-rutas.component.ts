import { Component, OnInit } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';

@Component({
  selector: 'app-listar-rutas',
  standalone:true,
  imports: [MatTableModule,CommonModule, MatButtonModule ,MatIconModule, RouterLink],
  templateUrl: './listar-rutas.component.html',
  styleUrl: './listar-rutas.component.css'
})
export class ListarRutasComponent implements OnInit{
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']

  constructor(private rS: RutaService, private router:Router) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
    this.rS.deleteU(id).subscribe(() =>{

    this.rS.list().subscribe(data=>{
      this.rS.setList(data);
    })
})
}
// Función para ver detalle (nueva)
  verDetalle(id: number): void {
    this.router.navigate(['/rutas/detalle', id])
  }

}
