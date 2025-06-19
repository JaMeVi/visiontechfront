import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Rutas } from '../models/rutas';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  private listaCambio = new Subject<Rutas[]>();
  private url=`${base_url}/rutas`
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Rutas[]>(this.url);
  }

  getList() { // para actualizar automático (looks like)
    return this.listaCambio.asObservable();
  }

    deleteA(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }

    setList(listaNueva: Rutas[]) {
    this.listaCambio.next(listaNueva);
  }


}