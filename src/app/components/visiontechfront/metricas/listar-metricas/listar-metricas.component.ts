import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Metrica } from '../../../../models/metrica';
import { MetricaService } from '../../../../services/metrica.service';

@Component({
  selector: 'app-listar-metricas',
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterLink, MatIconModule,],
  templateUrl: './listar-metricas.component.html',
  styleUrl: './listar-metricas.component.css'
})
export class ListarMetricasComponent  implements OnInit{
  dataSource: MatTableDataSource<Metrica> = new MatTableDataSource()

  displayedColumns: string[] = ['Id','Titulo','Comentario','FechaCreacion','EstadoCerrado','Actualizar','Eliminar']

  constructor(private mS: MetricaService, private router:Router) { }


  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.mS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
  })
}
eliminar(id:number){
  this.mS.deleteA(id).subscribe(() =>{

    this.mS.list().subscribe(data=>{
      this.mS.setList(data);
    })
})

}

}
