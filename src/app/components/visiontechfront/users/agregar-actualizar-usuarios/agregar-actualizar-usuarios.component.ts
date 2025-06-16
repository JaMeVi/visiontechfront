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
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

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
  edicion: boolean=false

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
      codigo:[''],
      usernameu: ['', Validators.required],
      enabledu: ['', Validators.required],
      correoelectronico: ['', Validators.required],
      telofonou: ['', Validators.required],
      nombreu: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.user.id = this.form.value.codigo;
      this.user.username = this.form.value.usernameu;
      this.user.enabled = this.form.value.enabledu;
      this.user.correoElectronico = this.form.value.correoelectronico;
      this.user.telefono = this.form.value.telefonou;
      this.user.nombre = this.form.value.nombreu;
      if (this.edicion){
        this.uS.update(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        }); 
      }else{
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
        codigo:new FormControl(data.id),
        usernameu:new FormControl(data.username),
        enabledu:new FormControl(data .enabled),
        correoelectronico: new FormControl(data.correoElectronico),
        telofonu: new FormControl(data.telefono),
        nombreu: new FormControl(data.nombre),
        

      })
    })
  } 
}

}
