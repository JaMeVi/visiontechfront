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
import { Roles } from '../../../models/roles';
import { Usuarios } from '../../../models/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { RolesService } from '../../../services/roles.service';


@Component({
  selector: 'app-insertar-editar-roles',
   providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertar-editar-roles.component.html',
  styleUrl: './insertar-editar-roles.component.css'
})
export class InsertarEditarRolesComponent implements OnInit{
form: FormGroup = new FormGroup({});
  ver: Roles = new Roles()
  estado: boolean = true

  id: number = 0
  edicion: boolean = false

  listaUsuarios:Usuarios[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router,
    private rS:RolesService,
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
      rol: ['', Validators.required],
     user: ['', Validators.required],
    
   })
   this.uS.list().subscribe(data=>{
    this.listaUsuarios=data
    })
  }


  aceptar() {
    if (this.form.valid) {
      this.ver.idRol= this.form.value.codigo;
      this.ver.rol= this.form.value.rol;
      this.ver.user.idUsuario = this.form.value.user;
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
      this.router.navigate(['roles'])
  }
}

   init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          rol: new FormControl(data.rol),
          user: new FormControl(data.user.idUsuario)
         
        })
      })
    }
  }
 }
