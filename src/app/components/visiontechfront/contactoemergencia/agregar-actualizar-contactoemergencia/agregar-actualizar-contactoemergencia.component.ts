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
import { ContactoEmergencia } from '../../../../models/contactoemergencia';
import { ContactoemergenciaService } from '../../../../services/contactoemergencia.service';


@Component({
  selector: 'app-agregar-actualizar-contactoemergencia',
  providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-contactoemergencia.component.html',
  styleUrl: './agregar-actualizar-contactoemergencia.component.css'
})
export class AgregarActualizarContactoemergenciaComponent {
  form: FormGroup = new FormGroup({});
  contactoemergencia: ContactoEmergencia = new ContactoEmergencia();
  estado:boolean=false
  idu:number=0
  id:number=0
  edicion:boolean=false



  constructor(
    private cS: ContactoemergenciaService,
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
      correoelectronico: ['', Validators.required],
      nombrec: ['', Validators.required],
      telefonoc: ['', Validators.required],
      idu:['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.contactoemergencia.correoElectronico = this.form.value.correoelectronico;
      this.contactoemergencia.nombre = this.form.value.nombrec;
      this.contactoemergencia.telefono = this.form.value.telefonoc;
      this.contactoemergencia.idUsuario = this.form.value.idu;

      if(this.edicion){
        this.cS.update(this.contactoemergencia).subscribe(()=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });

      }else{
        this.cS.insert(this.contactoemergencia).subscribe(()=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      }

      this.cS.insert(this.contactoemergencia).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['contactoemergencia']);
    }
  }
  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idContacto),
          correoelectronico:new FormControl(data.correoElectronico),
          nombrec:new FormControl(data.nombre),
          telefonoc:new FormControl(data.telefono),
          idu:new FormControl(data.idUsuario)
        })
      })
    }
  }

}
