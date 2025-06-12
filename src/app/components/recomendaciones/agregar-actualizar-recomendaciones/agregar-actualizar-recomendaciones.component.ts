import { Recomendacion } from '../../../models/recomendacion';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-agregar-actualizar-recomendaciones',
  providers: [provideNativeDateAdapter()],
  imports:[ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-recomendaciones.component.html',
  styleUrls: ['./agregar-actualizar-recomendaciones.component.css']
})
export class AgregarActualizarRecomendacionesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
    recomendacion: Recomendacion = new Recomendacion();
  
  
  
    constructor(
      private rS: RecomendacionesService,
      private router: Router,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        comentarior: ['', Validators.required],
        puntuacionr: ['', Validators.required],
      });
    }
    aceptar() {
      if (this.form.valid) {
        this.recomendacion.comentario = this.form.value.nombreruta;
        this.recomendacion.puntuacion = this.form.value.destinor;
  
        this.rS.insert(this.recomendacion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
        this.router.navigate(['recomendaciones']);
      }
    }
  }
  
  


