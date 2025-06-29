import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Recomendaciones } from '../../../models/recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-recomendaciones',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
    MatIconModule, MatFormFieldModule, MatPaginator, RouterLink ],
  templateUrl: './listar-recomendaciones.component.html',
  styleUrl: './listar-recomendaciones.component.css'
})
export class ListarRecomendacionesComponent implements OnInit, AfterViewInit {
dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2','c3', 'c4']

  pcCantidadRegistros: number = 0;

  pcPageSizeOptions = [4, 8, 10];

  @ViewChild(MatPaginator) pcPaginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private rS: RecomendacionesService) { }

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



