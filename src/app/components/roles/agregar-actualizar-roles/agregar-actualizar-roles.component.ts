import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Roles } from '../../../models/roles';
import { User } from '../../../models/user';
import { RolesService } from '../../../services/roles.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-agregar-actualizar-roles',
  standalone:true,
   providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-roles.component.html',
  styleUrl: './agregar-actualizar-roles.component.css'
})
export class AgregarActualizarRolesComponent {
  form: FormGroup = new FormGroup({});
  roles: Roles = new Roles();
  listaUsuarios:User[]=[];

  id: number=0
  edicion: boolean=false

  constructor(
    private rS: RolesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private uS:UserService
  ) {}
  listarRoles:{
    value:string; viewValue:string
  }[]=[
    {value:'ADMINISTRADOR', viewValue: 'ADMINISTRADOR'},
    {value:'PROGRAMADOR', viewValue: 'PROGRAMADOR'},
    {value:'INVITADO', viewValue: 'INVITADO'},
  ]

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      //actualizar
      this.init()
    })
    this.form = this.formBuilder.group({
      codigo:[''],
      rolr: ['', Validators.required],
      userid: ['', Validators.required],
    });
     this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.roles.id = this.form.value.codigo;
      this.roles.rol = this.form.value.rolr;
      this.roles.users.id = this.form.value.userid;
      if (this.edicion){
        this.rS.update(this.roles).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        }); 
      }else{
        this.rS.insert(this.roles).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      }); 
      }

     
      this.router.navigate(['roles']);
    }
  }
  init(){
  if(this.edicion){
    this.rS.listId(this.id).subscribe(data=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.id),
        rolr:new FormControl(data.rol),
        userid: new FormControl(data.users.id),

      })
    })
  } 
}


}
