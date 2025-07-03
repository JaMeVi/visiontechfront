import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Temaforo } from '../../../models/temasforo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TemasforoService } from '../../../services/temasforo.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listar-temasforo',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatPaginator,     
    RouterLink,
    MatInputModule, ],
  templateUrl: './listar-temasforo.component.html',
  styleUrl: './listar-temasforo.component.css'
})
export class ListarTemasforoComponent  implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<Temaforo> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5','c6','c7','c8']

  pcCantidadRegistros: number = 0;

  pcPageSizeOptions = [4, 8, 10];

  @ViewChild(MatPaginator) pcPaginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private rS: TemasforoService) { }

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
