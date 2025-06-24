import { CAtmosfericas } from './../../../models/catmosfericas';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CatmosfericasService } from '../../../services/catmosfericas.service';

@Component({
  selector: 'app-listar-catmosfericas',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
   //RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listar-catmosfericas.component.html',
  styleUrl: './listar-catmosfericas.component.css'
})
export class ListarCatmosfericasComponent implements OnInit {

dataSource: MatTableDataSource<CAtmosfericas> = new MatTableDataSource()
  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6']

  constructor(private caS: CatmosfericasService) { }

  ngOnInit(): void {
    this.caS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    // para actualizar automáticamente
    this.caS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number){
    this.caS.deleteA(id).subscribe(data => {
      this.caS.list().subscribe(data => {
        this.caS.setList(data)
      })
    })
  }
}
