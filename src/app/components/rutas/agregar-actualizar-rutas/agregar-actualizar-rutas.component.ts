import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Rutas } from '../../../models/rutas';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatRadioModule } from '@angular/material/radio';
import { RutasService } from '../../../services/rutas.service';
import { Usuarios } from '../../../models/usuarios';


@Component({
  selector: 'app-agregar-actualizar-rutas',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './agregar-actualizar-rutas.component.html',
  styleUrl: './agregar-actualizar-rutas.component.css'
})
export class AgregarActualizarRutasComponent  implements OnInit{
   form: FormGroup = new FormGroup({});
   ver: Rutas = new Rutas()
   estado: boolean = true
 
   id: number = 0
   edicion: boolean = false
 
   listaUsuarios:Usuarios[]=[]
 
   constructor(
      private formBuilder: FormBuilder,
      private rS:RutasService,
      private router: Router,
      private uS: UsuariosService,
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
       nombre: ['', Validators.required],
       destino: ['', Validators.required],
       inicio: ['', Validators.required],
       distancia: ['', Validators.required],
       favorito: ['', Validators.required],
       tiempo: ['', Validators.required],
       longitud: ['', Validators.required],
       latitud: ['', Validators.required],
       usuario: ['', Validators.required],
    })
    this.uS.list().subscribe(data=>{
     this.listaUsuarios=data
     })
   }
 
 
   aceptar() {
     if (this.form.valid) {
       this.ver.idRuta = this.form.value.codigo;
       this.ver.nombreRuta = this.form.value.nombre;
       this.ver.destino= this.form.value.destino;
       this.ver.inicio = this.form.value.inicio;
       this.ver.distanciaMetros = this.form.value.distancia;
       this.ver.favorito = this.form.value.favorito;
       this.ver.tiempoRuta = this.form.value.tiempo;
       this.ver.longitud = this.form.value.longitud;
       this.ver.latitud = this.form.value.latitud;
       this.ver.usuario.idUsuario = this.form.value.usuario;
  
       if (this.edicion){
   //actualziar
       this.rS.update(this.ver).subscribe(() => {
         this.rS.list().subscribe(data => {
           this.rS.setList(data)
         });
       });
     }  else {
         //insertar
         this.rS.insert(this.ver).subscribe(() => {
           this.rS.list().subscribe((data) => {
             this.rS.setList(data);
           });
         });
       }
       this.router.navigate(['rutas'])
   }
 }
 
    init() {
     if (this.edicion) {
       this.rS.listId(this.id).subscribe(data => {
         this.form = new FormGroup({
           codigo: new FormControl(data.idRuta),
           nombre: new FormControl(data.nombreRuta),
           destino: new FormControl(data.destino),
           inicio: new FormControl(data.inicio),
           distancia: new FormControl(data.distanciaMetros),
           favorito: new FormControl(data.favorito),
           tiempo: new FormControl(data.tiempoRuta),
           longitud: new FormControl(data.longitud),
           latitud: new FormControl(data.latitud),
           usuario: new FormControl(data.usuario.idUsuario),
          
         })
       })
     }
   }
  }
 