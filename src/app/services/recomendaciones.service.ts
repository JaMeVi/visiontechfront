import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Recomendaciones } from '../models/recomendaciones';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  private listaCambio = new Subject<Recomendaciones[]>();
  private url=`${base_url}/recomendaciones`
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Recomendaciones[]>(this.url);
  }

  getList() { // para actualizar automático (looks like)
    return this.listaCambio.asObservable();
  }

    deleteA(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }

    setList(listaNueva: Recomendaciones[]) {
    this.listaCambio.next(listaNueva);
  }


}