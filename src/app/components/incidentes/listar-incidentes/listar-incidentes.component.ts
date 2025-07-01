import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Incidente } from '../../../models/incidentes';
import { IncidentesService } from '../../../services/incidentes.service';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-listar-incidentes',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule, MatFormField, MatPaginator, MatLabel],
  templateUrl: './listar-incidentes.component.html',
  styleUrl: './listar-incidentes.component.css'
})
export class ListarIncidentesComponent implements OnInit {
 dataSource: MatTableDataSource<Incidente> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5','c6','c7']

  pcCantidadRegistros: number = 0;

  pcPageSizeOptions = [4, 8, 10];

  @ViewChild(MatPaginator) pcPaginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private rS: IncidentesService) { }

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
  ngAfterViewInit() {
    this.dataSource.paginator = this.pcPaginator;
  }
}
