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
import { Rutas } from '../../../models/rutas';
import { RutasService } from '../../../services/rutas.service';
import { Incidente } from '../../../models/incidentes';
import { IncidentesService } from '../../../services/incidentes.service';

@Component({
  selector: 'app-insertar-editar-incidentes',
   providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertar-editar-incidentes.component.html',
  styleUrl: './insertar-editar-incidentes.component.css'
})
export class InsertarEditarIncidentesComponent {
form: FormGroup = new FormGroup({});
  ver: Incidente = new Incidente()
  estado: boolean = true

  id: number = 0
  edicion: boolean = false

  listaRutas:Rutas[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private iS: IncidentesService,
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
      this.ver.idIncidente = this.form.value.codigo;
      this.ver.descripcion = this.form.value.descripcioni;
      this.ver.gravedad = this.form.value.gravedadi;
      this.ver.tipo = this.form.value.tipoi;
      this.ver.ruta.idRuta = this.form.value.ruta;
if (this.edicion){
  //actualziar
      this.iS.update(this.ver).subscribe(() => {
        this.iS.list().subscribe(data => {
          this.iS.setList(data)
        });
      });
    }  else {
        //insertar
        this.iS.insert(this.ver).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      this.router.navigate(['incidentes'])
  }
}

   init() {
    if (this.edicion) {
      this.iS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idIncidente),
          descripcioni: new FormControl(data.descripcion),
          gravedadi: new FormControl(data.gravedad),
          tipoi: new FormControl(data.tipo),
          ruta: new FormControl(data.ruta.idRuta)
         
        })
      })
    }
  }
 }
