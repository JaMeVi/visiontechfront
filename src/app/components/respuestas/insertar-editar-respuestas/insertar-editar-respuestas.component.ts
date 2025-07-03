import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Respuesta } from '../../../models/respuestas';
import { Temaforo } from '../../../models/temasforo';
import { RespuestasService } from '../../../services/respuestas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TemasforoService } from '../../../services/temasforo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertar-editar-respuestas',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertar-editar-respuestas.component.html',
  styleUrl: './insertar-editar-respuestas.component.css'
})
export class InsertarEditarRespuestasComponent implements OnInit {

  form: FormGroup = new FormGroup({});
    ver: Respuesta = new Respuesta()
    estado: boolean = true
  
    id: number = 0
    edicion: boolean = false
  
    listaRutas:Temaforo[]=[]

    validacionFecha(control: AbstractControl) {
    let fechaSeleccionada = control.value;
    if (!fechaSeleccionada) return null;
    let fechaActual = new Date();
    return fechaSeleccionada > fechaActual ? { fechaInvalida: true } : null;
  }

    pcTipos: { value: string; viewValue: string }[] = [
    { value: "1", viewValue: "1 " },
    { value: "2", viewValue: "2" },
    { value: "3", viewValue: "3" },
    { value: "4", viewValue: "4" },
    { value: "5", viewValue: "5" }, 
  ]
  
    constructor(
      private formBuilder: FormBuilder,
      private mS: RespuestasService,
      private router: Router,
      private rS:TemasforoService,
    private route: ActivatedRoute,
    private snackBar:MatSnackBar) { }
  
    ngOnInit(): void {
    
      this.route.params.subscribe((data: Params) => {
        this.id = data['id']
        this.edicion = data['id'] != null
        //actualizar
        this.init()
      })
  
      this.form = this.formBuilder.group({
        codigo:[''],
        respuestar: ['', Validators.required],
        fecharespuesta: ['',[Validators.required, this.validacionFecha]],
        tema: ['', Validators.required],
    })
    this.rS.list().subscribe(data=>{
      this.listaRutas=data
      })
    }
  
  
    aceptar() {
      if (this.form.valid) {
        this.ver.idRespuesta = this.form.value.codigo;
        this.ver.respuesta = this.form.value.respuestar;
        this.ver.fechaRespuesta = this.form.value.fecharespuesta;
        this.ver.temaForo.idTema = this.form.value.tema;
  if (this.edicion){
    //actualziar
        this.mS.update(this.ver).subscribe(() => {
          this.mS.list().subscribe(data => {
            this.mS.setList(data)
          });
        });
        this.router.navigate(['respuesta']);
                this.snackBar.open("Se Actualizo correctamente las respuestas","OK",{duration:5000});

      }  else {
          //insertar
          this.mS.insert(this.ver).subscribe(() => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
            this.router.navigate(['inserciones']);
          this.snackBar.open("Se registró correctamente la respuesta","OK",{duration:5000});
          });
        }
    }
  }
  
    init() {
      if (this.edicion) {
        this.mS.listId(this.id).subscribe(data => {
          this.form = new FormGroup({
            codigo: new FormControl(data.idRespuesta),
            respuestar: new FormControl(data.respuesta),
            fecharespuesta: new FormControl(data.fechaRespuesta),
            tema: new FormControl(data.temaForo.idTema)
          
          })
        })
      }
    }

    cancelar() {
  // Redirigir sin guardar
  this.router.navigate(['respuesta']);
}

}
