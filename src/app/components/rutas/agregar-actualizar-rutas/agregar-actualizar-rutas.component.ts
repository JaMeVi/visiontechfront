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
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';


@Component({
  selector: 'app-agregar-actualizar-rutas',
  providers: [provideNativeDateAdapter()],
  standalone:true,
  
  imports: [ReactiveFormsModule,
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
  estado:boolean=true

  id: number=0
  edicion: boolean=false

  tipos:{value:string;viewValue:string}[]=[
    {value:"Sistema Operativo",viewValue:"Sistema Operativo"},
    {value:"Ofimática",viewValue:"Ofimática"}
  ]

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
      codigo:[''],
      nombrerutar: ['', Validators.required],
      inicior: ['', Validators.required],
      destinor: ['', Validators.required],
      favoritor: ['', Validators.required],
      distanciametros: ['', Validators.required],
      tiemporuta:['', Validators.required]

    });
  }
  aceptar() {
    if (this.form.valid) {
      this.ruta.idRuta = this.form.value.codigo;
      this.ruta.nombreRuta = this.form.value.nombrerutar;
      this.ruta.inicio = this.form.value.inicior;
      this.ruta.destino = this.form.value.destinor;
      this.ruta.favorito = this.form.value.favoritor;
      this.ruta.distanciaMetros = this.form.value.distanciametros;
      this.ruta.tiempoRuta = this.form.value.tiemporuta;
      if (this.edicion){
        this.rS.update(this.ruta).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        }); 
      }else{
        this.rS.insert(this.ruta).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      }); 
      }

     
      this.router.navigate(['rutas']);
    }
  }
  init(){
  if(this.edicion){
    this.rS.listId(this.id).subscribe(data=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.idRuta),
        nombrerutar:new FormControl(data.nombreRuta),
        inicior:new FormControl(data.inicio),
        destinor:new FormControl(data.destino),
        favoritor:new FormControl(data.favorito),
        distanciametros: new FormControl(data.distanciaMetros),
        tiemporuta: new FormControl(data.tiempoRuta)
      })
    })

  } 
}

}
