import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';
import { CEmergencia } from '../../../models/contactoemergencia';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ContactoemergenciaComponent } from "../contactoemergencia.component";

@Component({
  selector: 'app-listarcontactoemergencia',  
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    // RouterLink, // ayda a reconocer el evento de enrutamento del HTML
    MatIconModule],
  templateUrl: './listarcontactoemergencia.component.html',
  styleUrl: './listarcontactoemergencia.component.css',
})
export class ListarcontactoemergenciaComponent implements OnInit {
  dataSource: MatTableDataSource<CEmergencia> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private cS: ContactoemergenciaService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
