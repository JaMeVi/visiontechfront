import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Recomendaciones } from '../../../models/recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';

@Component({
  selector: 'app-listarrecomendaciones',
  imports: [ MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './listarrecomendaciones.component.html',
  styleUrl: './listarrecomendaciones.component.css'
})
export class ListarrecomendacionesComponent implements OnInit {
   dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private rS: RecomendacionesService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
