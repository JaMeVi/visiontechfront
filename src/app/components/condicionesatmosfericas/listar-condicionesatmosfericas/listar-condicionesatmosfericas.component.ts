import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CondicionAtmosferica } from '../../../../../models/condicionatmosferica';
import { CondicionatmosfericaService } from '../../../services/condicionatmosferica.service';



@Component({
  selector: 'app-listar-condicionesatmosfericas',
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterLink, MatIconModule,],
  templateUrl: './listar-condicionesatmosfericas.component.html',
  styleUrl: './listar-condicionesatmosfericas.component.css'
})
export class ListarCondicionesatmosfericasComponent implements OnInit {
dataSource: MatTableDataSource<CondicionAtmosferica> = new MatTableDataSource()

  displayedColumns: string[] = ['Id','c2','c3','c4','c5','c6','Actualizar','Eliminar']

  constructor(private cS: CondicionatmosfericaService, private router:Router) { }


  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
  this.cS.deleteA(id).subscribe(() =>{

    this.cS.list().subscribe(data=>{
      this.cS.setList(data);
    })
})

}
}
