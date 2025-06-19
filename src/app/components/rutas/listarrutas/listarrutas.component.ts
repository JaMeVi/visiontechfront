
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { RutasService } from '../../../services/rutas.service';
import { Rutas } from '../../../models/rutas';

@Component({
  selector: 'app-listarrutas',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
   // RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listarrutas.component.html',
  styleUrl: './listarrutas.component.css'
})
export class ListarrutasComponent implements OnInit{
    
  dataSource: MatTableDataSource<Rutas> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5', 'c6','c7','c8', 'c9','c10']

  constructor(private rS: RutasService) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    // para actualizar automáticamente
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number){
    this.rS.deleteA(id).subscribe(data => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data)
      })
    })
  }
}



