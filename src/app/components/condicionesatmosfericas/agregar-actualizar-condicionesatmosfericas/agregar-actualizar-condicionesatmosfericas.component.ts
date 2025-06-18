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
import { CondicionAtmosferica } from '../../../../../models/condicionatmosferica';
import { CondicionatmosfericaService } from '../../../services/condicionatmosferica.service';



@Component({
  selector: 'app-agregar-actualizar-condicionesatmosfericas',
  providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-condicionesatmosfericas.component.html',
  styleUrl: './agregar-actualizar-condicionesatmosfericas.component.css'
})
export class AgregarActualizarCondicionesatmosfericasComponent {
  form: FormGroup = new FormGroup({});
  condicionatmosferica: CondicionAtmosferica = new CondicionAtmosferica();
  estado:boolean=false
  idr:number=0
  id:number=0
  edicion:boolean=false



  constructor(
    private cS: CondicionatmosfericaService,
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
      fechahora: ['', Validators.required],
      humedadc: ['', Validators.required],
      temperaturac: ['', Validators.required],
      velocidadviento: ['', Validators.required],
      idruta:['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.condicionatmosferica.fechaHora = this.form.value.fechahora;
      this.condicionatmosferica.humedad = this.form.value.humedadc;
      this.condicionatmosferica.temperatura = this.form.value.temperaturac;
      this.condicionatmosferica.velocidadViento = this.form.value.velocidadviento;
      this.condicionatmosferica.idRuta=this.form.value.idruta;

      if(this.edicion){
        this.cS.update(this.condicionatmosferica).subscribe(()=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });

      }else{
        this.cS.insert(this.condicionatmosferica).subscribe(()=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      }

      this.cS.insert(this.condicionatmosferica).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['catmosfericas']);
    }
  }
  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idCondicionAtmosferica),
          fechahora:new FormControl(data.fechaHora),
          humedadc:new FormControl(data.humedad),
          temperaturac:new FormControl(data.temperatura),
          velocidadviento:new FormControl(data.velocidadViento),
          idruta:new FormControl(data.idRuta)
        })
      })
    }
  }
}
