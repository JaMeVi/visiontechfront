import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-listar-rutas',
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterLink, MatIconModule,],
  templateUrl: './listar-rutas.component.html',
  styleUrl: './listar-rutas.component.css'
})
export class ListarRutasComponent implements OnInit{
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource()

  displayedColumns: string[] = ['id','nombre','destino','inicio','verDetalleRuta','Actualizar','Eliminar']

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
    this.rS.list().subscribe(data=>{
      this.rS.setList(data)
    })
}
// Función para ver detalle (nueva)
  verDetalle(id: number): void {
    this.router.navigate(['/rutas/detalle', id])
  }

  

}
