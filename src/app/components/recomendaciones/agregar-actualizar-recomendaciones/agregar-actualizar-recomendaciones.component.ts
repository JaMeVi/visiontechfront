import { Component } from '@angular/core';
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
import { Recomendaciones } from '../../../models/recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';


@Component({
  selector: 'app-agregar-actualizar-recomendaciones',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-recomendaciones.component.html',
  styleUrl: './agregar-actualizar-recomendaciones.component.css'
})
export class AgregarActualizarRecomendacionesComponent {
  form: FormGroup = new FormGroup({});
  recomendaciones: Recomendaciones = new Recomendaciones();
  estado:boolean=true

  id: number=0
  edicion: boolean=false

  puntuaciones: { value: number, viewValue: string }[] = [
  { value: 1, viewValue: '1 - Muy baja' },
  { value: 2, viewValue: '2 - Baja' },
  { value: 3, viewValue: '3 - Media' },
  { value: 4, viewValue: '4 - Alta' },
  { value: 5, viewValue: '5 - Muy alta' }
];

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
      codigo:[''],
      comentarior: ['', Validators.required],
      puntuacionr: ['', Validators.required],
      idruta: ['', Validators.required]

    });
  }
  aceptar() {
    if (this.form.valid) {
      this.recomendaciones.idRecomendacion = this.form.value.codigo;
      this.recomendaciones.comentario = this.form.value.nombrerutar;
      this.recomendaciones.puntuacion = this.form.value.puntuacionr;
      this.recomendaciones.idRuta = this.form.value.idruta;
      if (this.edicion){
        this.rS.update(this.recomendaciones).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        }); 
      }else{
        this.rS.insert(this.recomendaciones).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      }); 
      }

     
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
        idruta:new FormControl(data.idRuta),
      })
    })

  } 
}


}
