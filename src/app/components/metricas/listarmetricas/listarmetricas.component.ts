import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Metrica } from '../../../models/metrica';
import { MetricasService } from '../../../services/metricas.service';

@Component({
  selector: 'app-listarmetricas',
  imports: [MatTableModule],
  templateUrl: './listarmetricas.component.html',
  styleUrl: './listarmetricas.component.css'
})

export class ListarmetricasComponent implements OnInit{
dataSource: MatTableDataSource<Metrica> = new MatTableDataSource()
displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']

 constructor(private mS: MetricasService) { }

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
}
