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
import { Temaforo } from '../../../models/temaforo';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { TemaforoService } from '../../../services/temaforo.service';



@Component({
  selector: 'app-agregar-actualizar-respuestas',
   providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-respuestas.component.html',
  styleUrl: './agregar-actualizar-respuestas.component.css'
})
export class AgregarActualizarRespuestasComponent implements OnInit {

   form: FormGroup = new FormGroup({});
   listarTemasForos: Temaforo[]=[];
  respuesta: Respuesta = new Respuesta();
  estado:boolean=true

  id:number=0
  edicion:boolean=false



  constructor(
    private rS: RespuestaService,
    private router: Router,
    private tS:TemaforoService,
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
     // Cargar lista de temas foros
    this.tS.list().subscribe((data) => {
      this.listarTemasForos = data;
    });
    this.form = this.formBuilder.group({
      fecharespuesta: ['', Validators.required],
      respuestar: ['', Validators.required],
      idtema: ['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.respuesta.fechaRespuesta = this.form.value.fecharespuesta;
      this.respuesta.respuesta = this.form.value.respuestar;
      this.respuesta.temaForo.idTema = this.form.value.idtema;

      if(this.edicion){
        this.rS.update(this.respuesta).subscribe(()=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });

      }else{
        this.rS.insert(this.respuesta).subscribe(()=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      }

      this.rS.insert(this.respuesta).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['respuesta']);
    }
  }
  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idRespuesta),
          titulotema:new FormControl(data.fechaRespuesta),
          comentariot:new FormControl(data.respuesta),
        })
      })
    }
  }

}
