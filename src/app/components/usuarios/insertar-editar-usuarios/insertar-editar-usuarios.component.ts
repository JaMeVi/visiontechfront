import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuarios } from '../../../models/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-insertar-editar-usuarios',
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
  templateUrl: './insertar-editar-usuarios.component.html',
  styleUrl: './insertar-editar-usuarios.component.css'
})
export class InsertarEditarUsuariosComponent implements OnInit{
 form: FormGroup = new FormGroup({});
  ver: Usuarios = new Usuarios()
  estado: boolean = true

  id: number = 0
  edicion: boolean = false



  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router, 
   private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo:[''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      nombre: ['', Validators.required],
   })

   
   
  }


  aceptar() {
    if (this.form.valid) {
      this.ver.idUsuario= this.form.value.codigo;
      this.ver.username = this.form.value.username;
      this.ver.password= this.form.value.password;
      this.ver.enabled = this.form.value.enabled;
      this.ver.correoElectronico = this.form.value.correo;
      this.ver.telefono = this.form.value.telefono;
      this.ver.nombre = this.form.value.nombre;
   
if (this.edicion){
  //actualziar
    

      this.uS.update(this.ver).subscribe(() => {
        this.uS.list().subscribe(data => {
          this.uS.setList(data);
        });
      });
    }  else {
        //insertar
        this.ver.password = this.form.value.password;
        this.uS.insert(this.ver).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
  }
}

   init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          enabled: new FormControl(data.enabled),
          correo: new FormControl(data.correoElectronico),
          telefono: new FormControl(data.telefono),
          nombre: new FormControl(data.nombre)
         
        })
      })
    }
  }
 }


