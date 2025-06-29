import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { RutasService } from '../../../services/rutas.service';
import { Recomendaciones } from '../../../models/recomendaciones';
import { Rutas } from '../../../models/rutas';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertar-editar-recomendaciones',
  standalone:true,
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
  templateUrl: './insertar-editar-recomendaciones.component.html',
  styleUrl: './insertar-editar-recomendaciones.component.css'
})
export class InsertarEditarRecomendacionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
    ver: Recomendaciones = new Recomendaciones()
    estado: boolean = true
  
    id: number = 0
    edicion: boolean = false
  
    listaRutas:Rutas[]=[]

    pcTipos: { value: string; viewValue: string }[] = [
    { value: "1", viewValue: "1 " },
    { value: "2", viewValue: "2" },
    { value: "3", viewValue: "3" },
    { value: "4", viewValue: "4" },
    { value: "5", viewValue: "5" }, 
  ]
  
    constructor(
      private formBuilder: FormBuilder,
      private mS: RecomendacionesService,
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
        comentarior: ['', Validators.required],
        puntuacionr: ['', Validators.required],
        ruta: ['', Validators.required],
     })
     this.rS.list().subscribe(data=>{
      this.listaRutas=data
      })
    }
  
  
    aceptar() {
      if (this.form.valid) {
        this.ver.idRecomendacion = this.form.value.codigo;
        this.ver.comentario = this.form.value.comentarior;
        this.ver.puntuacion = this.form.value.puntuacionr;
        this.ver.ruta.idRuta = this.form.value.ruta;
  if (this.edicion){
    //actualziar
        this.mS.update(this.ver).subscribe(() => {
          this.mS.list().subscribe(data => {
            this.mS.setList(data)
          });
        });
        this.router.navigate(['recomendaciones']);
                this.snackBar.open("Se Actualizo correctamente las recomendaciones","OK",{duration:5000});

      }  else {
          //insertar
          this.mS.insert(this.ver).subscribe(() => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
            this.router.navigate(['inserciones']);
          this.snackBar.open("Se registró correctamente la recomendacion","OK",{duration:5000});
          });
        }
    }
  }
  
    init() {
      if (this.edicion) {
        this.mS.listId(this.id).subscribe(data => {
          this.form = new FormGroup({
            codigo: new FormControl(data.idRecomendacion),
            comentarior: new FormControl(data.comentario),
            puntuacionr: new FormControl(data.puntuacion),
            ruta: new FormControl(data.ruta.idRuta)
          
          })
        })
      }
    }

    cancelar() {
  // Redirigir sin guardar
  this.router.navigate(['recomendaciones']);
}


}
