import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Recomendaciones } from '../models/recomendaciones';
import { environment } from '../../environments/environment';
const base_url=environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
private url = `${base_url}/recomendaciones`;
  private listaCambio = new Subject<Recomendaciones[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Recomendaciones[]>(this.url);
  }

  insert(r: Recomendaciones) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Recomendaciones[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Recomendaciones>(`${this.url}/${id}`)
  }
  update(r:Recomendaciones){
    return this.http.put(this.url , r)
  }
  deleteU(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
