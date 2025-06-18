import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-agregar-actualizar-usuarios',
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
  templateUrl: './agregar-actualizar-usuarios.component.html',
  styleUrl: './agregar-actualizar-usuarios.component.css'
})
export class AgregarActualizarUsuariosComponent {
  form: FormGroup = new FormGroup({});
  user: User = new User();
  estado:boolean=true
  id: number=0
  edicion: boolean = false

    tipos: { value: string; viewValue: string }[] = [
    { value: "SO", viewValue: "Sistema Operativo" },
    { value: "Ofimática", viewValue: "Ofimática" }
  ]


  constructor(
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      //actualizar
      this.init()
    })

    this.form = this.formBuilder.group({
      id:[''],
      username: ['', Validators.required],
      enabled: ['', Validators.required],
      correoelec: ['', Validators.required],
      telofono: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.user.id = this.form.value.id;
      this.user.username = this.form.value.username;
      this.user.enabled = this.form.value.enabled;
      this.user.correoElectronico = this.form.value.correoelec;
      this.user.telefono = this.form.value.telofono;
      this.user.nombre = this.form.value.nombre;
     
          // si edición es true: 
      if (this.edicion){
          // actualiza
        this.uS.update(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
          
        }); 
             this.router.navigate(['usuarios']);
      }
      else{
        this.uS.insert(this.user).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      }); 
      }
        this.router.navigate(['usuarios']);
    }
  }
  init(){
  if(this.edicion){
    this.uS.listId(this.id).subscribe(data=>{
      this.form=new FormGroup({
        id:new FormControl(data.id),
        username:new FormControl(data.username),
        enabled:new FormControl(data.enabled),
        correoElectronico: new FormControl(data.correoElectronico),
        telefono: new FormControl(data.telefono),
        nombre: new FormControl(data.nombre),
        
      })
    })
  } 
}

}
