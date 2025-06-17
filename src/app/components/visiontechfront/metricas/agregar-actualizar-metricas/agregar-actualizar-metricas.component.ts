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
import { Metrica } from '../../../../models/metrica';
import { MetricaService } from '../../../../services/metrica.service';
import { RutaService } from '../../../../services/ruta.service';
import { Ruta } from '../../../../models/ruta';

@Component({
  selector: 'app-agregar-actualizar-metricas',
   providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-metricas.component.html',
  styleUrl: './agregar-actualizar-metricas.component.css'
})
export class AgregarActualizarMetricasComponent {
  form: FormGroup = new FormGroup({});
  metrica: Metrica = new Metrica();
  estado:boolean=true
  listarRutas: Ruta[]=[]

  id:number=0
  edicion:boolean=false



  constructor(
    private mS: MetricaService,
    private router: Router,
    private rS:RutaService,
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
     // Cargar lista de rutas
    this.rS.list().subscribe((data) => {
      this.listarRutas = data;
    });
    this.form = this.formBuilder.group({
      numeropasos: ['', Validators.required],
      caloriasquemadas: ['', Validators.required],
      tiempoefectivominutos: ['', Validators.required],
      fecham: ['', Validators.required],
      idruta: ['', Validators.required],
      
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.metrica.numeroPasos = this.form.value.numeropasos;
      this.metrica.caloriasQuemadas = this.form.value.caloriasquemadas;
      this.metrica.tiempoEfectivoMinutos = this.form.value.tiempoefectivominutos;
      this.metrica.fecha= this.form.value.fecham;
      this.metrica.idRuta = this.form.value.idruta;

      if(this.edicion){
        this.mS.update(this.metrica).subscribe(()=>{
          this.mS.list().subscribe((data)=>{
            this.mS.setList(data);
          });
        });

      }else{
        this.mS.insert(this.metrica).subscribe(()=>{
          this.mS.list().subscribe((data)=>{
            this.mS.setList(data);
          });
        });
      }

      this.mS.insert(this.metrica).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
      this.router.navigate(['metricas']);
    }
  }
  init(){
    if(this.edicion){
      this.mS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idMetrica),
          numeropasos:new FormControl(data.numeroPasos),
          caloriasquemadas:new FormControl(data.caloriasQuemadas),
          tiempoefectivominutos:new FormControl(data.tiempoEfectivoMinutos),
          idruta:new FormControl(data.idRuta),
          fecham:new FormControl(data.fecha),

          

        })
      })
    }
  }

}
