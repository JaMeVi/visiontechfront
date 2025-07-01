import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../models/usuarios';
import { Temaforo } from '../../../models/temasforo';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TemasforoService } from '../../../services/temasforo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-insertar-editar-temasforo',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule, MatCheckboxModule
  ],
  templateUrl: './insertar-editar-temasforo.component.html',
  styleUrl: './insertar-editar-temasforo.component.css'
})
export class InsertarEditarTemasforoComponent  implements OnInit{

  form: FormGroup = new FormGroup({});
    ver: Temaforo = new Temaforo()
    estado: boolean = true
  
    id: number = 0
    edicion: boolean = false
  
    listaRutas:Usuarios[]=[]

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
      private mS: TemasforoService,
      private router: Router,
      private rS:UsuariosService,
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
        comentarior: ['', Validators.required],
        estadocerrado: ['', Validators.required],
        fechacreacion: ['',[Validators.required, this.validacionFecha]],
        titulotema: ['', Validators.required],
        usuario: ['', Validators.required],
     })
     this.rS.list().subscribe(data=>{
      this.listaRutas=data
      })
    }
  
  
    aceptar() {
      if (this.form.valid) {
        this.ver.idTema = this.form.value.codigo;
        this.ver.comentario = this.form.value.comentariot;
        this.ver.estadoCerrado = this.form.value.estadocerrado;
        this.ver.fechaCreacion = this.form.value.fechacreacion;
        this.ver.tituloTema = this.form.value.titulotema;
        this.ver.usuario.id = this.form.value.usuario;
  if (this.edicion){
    //actualizar
        this.mS.update(this.ver).subscribe(() => {
          this.mS.list().subscribe(data => {
            this.mS.setList(data)
          });
        });
        this.router.navigate(['temaforo']);
                this.snackBar.open("Se Actualizo correctamente el temaforo","OK",{duration:5000});

      }  else {
          //insertar
          this.mS.insert(this.ver).subscribe(() => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
            this.router.navigate(['inserciones']);
          this.snackBar.open("Se registró correctamente el temaforo","OK",{duration:5000});
          });
        }
    }
  }
  
    init() {
      if (this.edicion) {
        this.mS.listId(this.id).subscribe(data => {
          this.form = new FormGroup({
            codigo: new FormControl(data.idTema),
            comentarior: new FormControl(data.comentario),
            estadocerrado: new FormControl(data.estadoCerrado),
            fechacreacion: new FormControl(data.fechaCreacion),
            titulotema: new FormControl(data.tituloTema),
            usuario: new FormControl(data.usuario.id)
          
          })
        })
      }
    }

    cancelar() {
  // Redirigir sin guardar
  this.router.navigate(['temaforo']);
}


}
