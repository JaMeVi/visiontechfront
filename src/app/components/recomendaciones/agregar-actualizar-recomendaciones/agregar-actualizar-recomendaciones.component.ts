import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Rutas } from '../../../models/rutas';
import { Recomendaciones } from '../../../models/recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { RutasService } from '../../../services/rutas.service';


@Component({
  selector: 'app-agregar-actualizar-recomendaciones',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './agregar-actualizar-recomendaciones.component.html',
  styleUrl: './agregar-actualizar-recomendaciones.component.css'
})
export class AgregarActualizarRecomendacionesComponent {

  form: FormGroup = new FormGroup({});

  recomendaciones: Recomendaciones = new Recomendaciones()

  listaRutas:Rutas[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private rsS: RecomendacionesService,
    private router: Router,
    private rS:RutasService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comentarior: ['', Validators.required],
      puntuacionr: ['', Validators.required],
      idruta: ['', Validators.required],
    })

   this.rS.list().subscribe(data=>{
    this.listaRutas=data
   })
  }
  aceptar() {
    if (this.form.valid) {
      this.recomendaciones.comentario = this.form.value.numero
      this.recomendaciones.puntuacion = this.form.value.fecha
      this.recomendaciones.ruta.idRuta = this.form.value.idruta
      this.rsS.insert(this.recomendaciones).subscribe(() => {
        this.rsS.list().subscribe(data => {
          this.rsS.setList(data)
        })
      })
      this.router.navigate(['recomendaciones'])

    }
  }

}
