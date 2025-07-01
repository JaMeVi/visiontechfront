import { Component } from '@angular/core';
import { Rutas } from '../../../models/rutas';
import { Incidente } from '../../../models/incidentes';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { IncidentesService } from '../../../services/incidentes.service';
import { RutasService } from '../../../services/rutas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatButtonModule
  ],
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
  
      pcTipos: { value: string; viewValue: string }[] = [
      { value: "alta", viewValue: "Alta " },
      { value: "media", viewValue: "Media" },
      { value: "baja", viewValue: "Baja" }
    ]
    
      constructor(
        private formBuilder: FormBuilder,
        private mS: IncidentesService,
        private router: Router,
        private rS:RutasService,
      private route: ActivatedRoute,
      private snackBar:MatSnackBar) { }
    
      ngOnInit(): void {
       
        this.route.params.subscribe((data: Params) => {
          this.id = data['id']
          this.edicion = data['id'] != null
          //actualizar
          this.init()
        })
    
        this.form = this.formBuilder.group({
          codigo:[''],
          descripcioni: ['', Validators.required],
          gravedadi: ['', Validators.required],
          tipoi: ['', Validators.required],
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
          this.mS.update(this.ver).subscribe(() => {
            this.mS.list().subscribe(data => {
              this.mS.setList(data)
            });
          });
          this.router.navigate(['incidentes']);
                  this.snackBar.open("Se Actualizo correctamente las incidencias","OK",{duration:5000});
  
        }  else {
            //insertar
            this.mS.insert(this.ver).subscribe(() => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
              this.router.navigate(['inserciones']);
            this.snackBar.open("Se registró correctamente el incidente","OK",{duration:5000});
            });
          }
      }
    }
    
      init() {
        if (this.edicion) {
          this.mS.listId(this.id).subscribe(data => {
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
  
      cancelar() {
    // Redirigir sin guardar
    this.router.navigate(['incidentes']);
  }

}
