import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { TemaforoService } from '../../../../services/temaforo.service';
import { Temaforo } from '../../../../models/temaforo';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-agregar-actualizar-temaforo',
   providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-temaforo.component.html',
  styleUrl: './agregar-actualizar-temaforo.component.css'
})
export class AgregarActualizarTemaforoComponent {
   form: FormGroup = new FormGroup({});
   listarUsuarios: User[]=[];
  temaforo: Temaforo = new Temaforo();
  estado:boolean=true

  id:number=0
  edicion:boolean=false



  constructor(
    private tS: TemaforoService,
    private router: Router,
    private uS:UserService,
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
     // Cargar lista de ciudades
    this.uS.list().subscribe((data) => {
      this.listarUsuarios = data;
    });
    this.form = this.formBuilder.group({
      titulotema: ['', Validators.required],
      comentariot: ['', Validators.required],
      fechacreacion: ['', Validators.required],
      estadocerrado: ['', Validators.required],
      iduser:['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.temaforo.tituloTema = this.form.value.titulotema;
      this.temaforo.comentario = this.form.value.comentariot;
      this.temaforo.fechaCreacion = this.form.value.fechacreacion;
      this.temaforo.estadoCerrado = this.form.value.estadocerrado;
      this.temaforo.usuario.id=this.form.value.iduser;

      if(this.edicion){
        this.tS.update(this.temaforo).subscribe(()=>{
          this.tS.list().subscribe((data)=>{
            this.tS.setList(data);
          });
        });

      }else{
        this.tS.insert(this.temaforo).subscribe(()=>{
          this.tS.list().subscribe((data)=>{
            this.tS.setList(data);
          });
        });
      }

      this.tS.insert(this.temaforo).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
      this.router.navigate(['temaforos']);
    }
  }
  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idTema),
          titulotema:new FormControl(data.tituloTema),
          comentariot:new FormControl(data.comentario),
          fechacreacion:new FormControl(data.fechaCreacion),
          estadocerrado:new FormControl(data.estadoCerrado)
        })
      })
    }
  }


}
