import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { Roles } from '../../../../models/roles';
import { RolesService } from '../../../../services/roles.service';

@Component({
  selector: 'app-listar-roles',
  standalone:true,
  imports: [MatTableModule,CommonModule, MatPaginator,MatButtonModule ,MatIconModule, RouterModule],
  templateUrl: './listar-roles.component.html',
  styleUrl: './listar-roles.component.css'
})
export class ListarRolesComponent implements OnInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', ]

  constructor(private rS: RolesService) { }

  /*ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}*/
ngOnInit(): void {
  this.rS.list().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator; // Actualiza paginador después de cargar datos
  });
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
