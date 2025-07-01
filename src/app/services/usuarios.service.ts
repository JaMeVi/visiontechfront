import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuarios } from '../models/usuarios';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private listaCambio = new Subject<Usuarios[]>();
  private url=`${base_url}/usuarios`
  constructor(private http:HttpClient) { }
  list() {
      return this.http.get<Usuarios[]>(`${this.url}/lista`);
    }
  
    insert(u: Usuarios) {
      return this.http.post(`${this.url}/inserciones`, u)
    }
  
    getList() { // para actualizar automático (looks like)
      return this.listaCambio.asObservable();
    }

       setList(listaNueva: Usuarios[]) {
      this.listaCambio.next(listaNueva);
    }

  listId(id: number) {
    return this.http.get<Usuarios>(`${this.url}/${id}`)
  }

      update(u: Usuarios) {
    return this.http.put(this.url, u)
  }
  
      deleteA(id: number){
      return this.http.delete(`${this.url}/${id}`)
   }
   }
  