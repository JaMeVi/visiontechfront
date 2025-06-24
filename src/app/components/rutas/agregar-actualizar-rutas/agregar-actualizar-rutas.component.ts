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
import { Usuarios } from '../../../models/usuarios';
import { RutasService } from '../../../services/rutas.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatRadioModule } from '@angular/material/radio';

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

  ruta: Rutas = new Rutas()

  listaUsuarios:Usuarios[]=[]

  estado: boolean = true
  id: number = 0

  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private rS: RutasService,
    private router: Router,
    private uS:UsuariosService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })
    this.form = this.formBuilder.group({
      destinor: ['', Validators.required],
      distanciametros: ['', Validators.required],
      favoritor: ['', Validators.required],
      inicior: ['', Validators.required],
      nombreruta: ['', Validators.required],
      latitudr: ['', Validators.required],
      longitudr: ['', Validators.required],
      tiemporuta: ['', Validators.required],
      usuar: ['', Validators.required],
    })
    
    }
  aceptar() {
    if (this.form.valid) {
      this.ruta.destino = this.form.value.destinor
      this.ruta.distanciaMetros = this.form.value.distanciametros
      this.ruta.favorito = this.form.value.favoritor
      this.ruta.inicio = this.form.value.inicior
      this.ruta.latitud = this.form.value.latitudr
      this.ruta.longitud = this.form.value.longitudr
      this.ruta.nombreRuta = this.form.value.nombreruta
      this.ruta.tiempoRuta = this.form.value.tiemporuta
      this.ruta.usuario.id = this.form.value.usuar
      if (this.edicion) {
        //actualizar
        this.rS.update(this.ruta).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });

   this.uS.list().subscribe(data=>{
    this.listaUsuarios=data
   })
  } else {
        //insertar
        this.rS.insert(this.ruta).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['rutas']);
  }}

   init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRuta),
          destinor: new FormControl(data.destino),
          inicior: new FormControl(data.inicio),
          favoritor: new FormControl(data.favorito),
          nombreruta: new FormControl(data.nombreRuta),
          distanciametros: new FormControl(data.distanciaMetros),
          tiemporuta: new FormControl(data.tiempoRuta),
          latitudr: new FormControl(data.latitud),
          longitudr: new FormControl(data.longitud),
          usuar: new FormControl(data.usuario.id)
        })
      })
    }
  }

}
