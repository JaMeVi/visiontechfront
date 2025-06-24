import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Metricas } from '../../../models/metricas';
import { MetricasService } from '../../../services/metricas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-metricas',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
    RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listar-metricas.component.html',
  styleUrl: './listar-metricas.component.css'
})
export class ListarMetricasComponent implements OnInit{
  
  dataSource: MatTableDataSource<Metricas> = new MatTableDataSource()

  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c7','c8']

  constructor(private mS: MetricasService) { }

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    // para actualizar automáticamente
    this.mS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number){
    this.mS.deleteA(id).subscribe(data => {
      this.mS.list().subscribe(data => {
        this.mS.setList(data)
      })
    })
  }
}
