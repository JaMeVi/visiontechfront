import { Recomendacion } from '../../../models/recomendacion';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
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

@Component({
  selector: 'app-agregar-actualizar-recomendaciones',
  providers: [provideNativeDateAdapter()],
  imports:[ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-recomendaciones.component.html',
  styleUrls: ['./agregar-actualizar-recomendaciones.component.css']
})
export class AgregarActualizarRecomendacionesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
    recomendacion: Recomendacion = new Recomendacion();
    id:number=0
    edicion:boolean=false
  
  
  
    constructor(
      private rS: RecomendacionesService,
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
        comentarior: ['', Validators.required],
        puntuacionr: ['', Validators.required],
        iDruta:['', Validators.required]
      });
    }
    aceptar() {
      if (this.form.valid) {
        this.recomendacion.comentario = this.form.value.nombreruta;
        this.recomendacion.puntuacion = this.form.value.destinor;
        this.recomendacion.idRuta= this.form.value.iDruta;

        if(this.edicion){
          this.rS.update(this.recomendacion).subscribe(()=>{
            this.rS.list().subscribe((data)=>{
              this.rS.setList(data);
            });
          });
        }else{
          this.rS.insert(this.recomendacion).subscribe(()=>{
            this.rS.list().subscribe((data)=>{
              this.rS.setList(data);
            });
          });
        }
  
        this.rS.insert(this.recomendacion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
        this.router.navigate(['recomendaciones']);
      }
    }
    init(){
      if(this.edicion){
        this.rS.listId(this.id).subscribe(data=>{
          this.form=new FormGroup({
            codigo:new FormControl(data.idRecomendacion),
            comentarior:new FormControl(data.comentario),
            puntuacionr:new FormControl(data.puntuacion),
            iDruta:new FormControl(data.idRuta)
          })
        })
      }
    }
  }
  
  


