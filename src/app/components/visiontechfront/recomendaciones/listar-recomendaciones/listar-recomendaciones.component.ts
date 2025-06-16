import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { Recomendaciones } from '../../../../models/recomendaciones';
import { RecomendacionesService } from '../../../../services/recomendaciones.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-recomendaciones',
  imports: [MatTableModule,CommonModule, MatButtonModule, RouterLink, MatIconModule, MatPaginator],
  templateUrl: './listar-recomendaciones.component.html',
  styleUrl: './listar-recomendaciones.component.css'
})
export class ListarRecomendacionesComponent implements OnInit {
   dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']

  constructor(private rS: RecomendacionesService, private router:Router) { }

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
 @ViewChild(MatPaginator) paginator!: MatPaginator;
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }
}
