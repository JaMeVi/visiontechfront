import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../models/respuesta';
import { environment } from '../../environments/environment';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
private url = `${base_url}/respuesta`;
private listaCambio = new Subject<Respuesta[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Respuesta[]>(this.url);
  }

  insert(rr: Respuesta) {
    return this.http.post(this.url, rr);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Respuesta[]){
    this.listaCambio .next(listaNueva);

  }

  listId(id:number){
    return this.http.get<Respuesta>(`${this.url}/${id}`)
  }
  update(rr:Respuesta){
    return this.http.put(this.url , rr)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

}
