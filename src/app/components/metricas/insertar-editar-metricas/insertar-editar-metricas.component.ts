import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Metricas } from '../../../models/metricas';
import { Rutas } from '../../../models/rutas';
import { MetricasService } from '../../../services/metricas.service';
import { RutasService } from '../../../services/rutas.service';


@Component({
  selector: 'app-insertar-editar-metricas',
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
  templateUrl: './insertar-editar-metricas.component.html',
  styleUrl: './insertar-editar-metricas.component.css'
})
export class InsertarEditarMetricasComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ver: Metricas = new Metricas()
  estado: boolean = true

  id: number = 0
  edicion: boolean = false

  listaRutas:Rutas[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private mS: MetricasService,
    private router: Router,
    private rS:RutasService,
   private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo:[''],
      pasos: ['', Validators.required],
      calorias: ['', Validators.required],
      tiempo: ['', Validators.required],
      fecha: ['', Validators.required],
      ruta: ['', Validators.required],
   })
   this.rS.list().subscribe(data=>{
    this.listaRutas=data
    })
  }


  aceptar() {
    if (this.form.valid) {
      this.ver.idMetrica = this.form.value.codigo;
      this.ver.numeroPasos = this.form.value.pasos;
      this.ver.caloriasQuemadas = this.form.value.calorias;
      this.ver.tiempoEfectivoMinutos = this.form.value.tiempo;
      this.ver.fecha = this.form.value.fecha;
      this.ver.ruta.idRuta = this.form.value.ruta;
if (this.edicion){
  //actualziar
      this.mS.update(this.ver).subscribe(() => {
        this.mS.list().subscribe(data => {
          this.mS.setList(data)
        });
      });
    }  else {
        //insertar
        this.mS.insert(this.ver).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['metricas'])
  }
}

   init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMetrica),
          pasos: new FormControl(data.numeroPasos),
          calorias: new FormControl(data.caloriasQuemadas),
          tiempo: new FormControl(data.tiempoEfectivoMinutos),
          fecha: new FormControl(data.fecha),
          ruta: new FormControl(data.ruta.idRuta)
         
        })
      })
    }
  }
 }
