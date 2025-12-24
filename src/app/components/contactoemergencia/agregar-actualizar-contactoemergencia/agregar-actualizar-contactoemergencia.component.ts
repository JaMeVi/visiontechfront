import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CEmergencia } from '../../../models/contactoemergencia';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../models/usuarios';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-agregar-actualizarcontactoemergencia',
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './agregar-actualizarcontactoemergencia.component.html',
  styleUrl: './agregar-actualizarcontactoemergencia.component.css'
})
export class InsertareditarcontactoemergenciaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  contacto: CEmergencia=new CEmergencia()
  listaUsuarios:Usuarios[]=[]
  constructor(
    private formBuilder:FormBuilder,
    private cS: ContactoemergenciaService,
    private router: Router,
    private uS: UsuariosService
  ) {}
  ngOnInit(): void {
      this.form=this.formBuilder.group({
        nombreCE:['', Validators.required],
        telefonoCE:['', Validators.required],
        correoElectronicoCE:['', Validators.required],
        usuarioCE:['', Validators.required]
      })
      this.uS.list().subscribe(data=>{
        this.listaUsuarios=data
  })
  }
aceptar(){
  if(this.form.valid){
    this.contacto.nombre=this.form.value.nombreCE   
    this.contacto.telefono=this.form.value.telefonoCE
    this.contacto.correoElectronico=this.form.value.correoElectronicoCE
    this.contacto.usuario=this.form.value.usuarioCE
    this.cS.insert(this.contacto).subscribe(()=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
      })
    })
     this.router.navigate(['contactoemergencia'])
  }
}
}
