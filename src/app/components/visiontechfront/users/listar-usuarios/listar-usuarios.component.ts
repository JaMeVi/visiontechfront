import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-usuarios',
  standalone:true,
  imports: [MatTableModule,CommonModule, MatButtonModule ,MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<User> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7', 'c8','c9']

  constructor(private uS: UserService) { }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
    this.uS.list().subscribe(data=>{
      this.uS.setList(data)
    })
}
@ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }  

}
