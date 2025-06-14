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
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';

@Component({
  selector: 'app-agregar-actualizar-rutas',
  providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './agregar-actualizar-rutas.component.html',
  styleUrl: './agregar-actualizar-rutas.component.css'
})
export class AgregarActualizarRutasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ruta: Ruta = new Ruta();

  id:number=0
  edicion:boolean=false



  constructor(
    private rS: RutaService,
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
      nombreruta: ['', Validators.required],
      destinor: ['', Validators.required],
      inicior: ['', Validators.required],
      favoritor: ['', Validators.required],
      distanciametros: ['', Validators.required],
      tiemporuta: ['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.ruta.nombreRuta = this.form.value.nombreruta;
      this.ruta.destino = this.form.value.destinor;
      this.ruta.inicio = this.form.value.inicior;
      this.ruta.favorito = this.form.value.favoritor;
      this.ruta.distanciaMetros = this.form.value.distanciametros;
      this.ruta.tiempoRuta = this.form.value.tiemporuta;

      if(this.edicion){
        this.rS.update(this.ruta).subscribe(()=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });

      }else{
        this.rS.insert(this.ruta).subscribe(()=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      }

      this.rS.insert(this.ruta).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['rutas']);
    }
  }
  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idRuta),
          nombreruta:new FormControl(data.nombreRuta),
          destinor:new FormControl(data.destino),
          inicior:new FormControl(data.inicio),
          favoritor:new FormControl(data.favorito),
          distanciametros:new FormControl(data.distanciaMetros),
          tiemporuta:new FormControl(data.tiempoRuta),
        })
      })
    }
  }
}



