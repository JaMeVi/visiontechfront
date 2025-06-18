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
import { Incidente } from '../../../models/incidente';
import { IncidenteService } from '../../../services/incidente.service';



@Component({
  selector: 'app-agregar-actualizar-incidentes',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-incidentes.component.html',
  styleUrl: './agregar-actualizar-incidentes.component.css'
})
export class AgregarActualizarIncidentesComponent {
  form: FormGroup = new FormGroup({});
  incidente: Incidente = new Incidente();

  id: number=0
  edicion: boolean=false

  tipos:{value:string;viewValue:string}[]=[
    {value:"Alta",viewValue:"Alta"},
    {value:"Baja",viewValue:"Baja"},
    {value:"Media",viewValue:"Media"}
  ]


  constructor(
    private iS: IncidenteService,
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
      tipoi: ['', Validators.required],
      gravedadi: ['', Validators.required],
      descripcioni: ['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.incidente.tipo = this.form.value.tipoi;
      this.incidente.gravedad = this.form.value.gravedadi;
      this.incidente.descripcion = this.form.value.descripcioni;
      if (this.edicion){
        this.iS.update(this.incidente).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        }); 
      }else{
        this.iS.insert(this.incidente).subscribe(() => {
        this.iS.list().subscribe((data) => {
          this.iS.setList(data);
        });
      }); 
      }

     
      this.router.navigate(['incidentes']);
    }
  }
  init(){
  if(this.edicion){
    this.iS.listId(this.id).subscribe(data=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.idIncidente),
        tipoi:new FormControl(data.tipo),
        gravedadi:new FormControl(data .gravedad),
        descripcioni: new FormControl(data.descripcion)
      })
    })

  } 
}


}
