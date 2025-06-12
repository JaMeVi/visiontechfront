import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Metrica } from '../../../models/metrica';
import { MetricasService } from '../../../services/metricas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-insertarmetricas',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertarmetricas.component.html',
  styleUrl: './insertarmetricas.component.css'
})
export class InsertarmetricasComponent {
  form: FormGroup = new FormGroup({});
  metrica: Metrica = new Metrica();
  estado:boolean=true

  tipos:{value:string;viewValue:string}[]=[
    {value:"SO", viewValue:"Sistema Operativo"} ,  
    {value:"ofimatica",viewValue:"Ofimatica"}
  ]

  constructor(
    private mS: MetricasService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit():void{
    this.form = this.formBuilder.group({
      numeroPasos:['',Validators.required],
      caloriasQuem:['',Validators.required],
      tiempoEfectivo:['',Validators.required],
      fecha:['',Validators.required],
      iDRuta:['',Validators.required]
       });
  }

  aceptar(){
    if(this.form.valid){
        this.metrica.numeroPasos = this.form.value.numeroPasos;
        this.metrica.caloriasQuemadas = this.form.value.caloriasQuem;
        this.metrica.tiempoEfectivoMinutos = this.form.value.tiempoEfectivo;
        this.metrica.fecha = this.form.value.fecha;
        this.metrica.idRuta = this.form.value.iDRuta;
    
        this.mS.insert(this.metrica).subscribe(()=>{
          this.mS.list().subscribe((data)=>{
            this.mS.setList(data);
          });
        });
        this.router.navigate(['metricas']);
    }


  }
  
}


