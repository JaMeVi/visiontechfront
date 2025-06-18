import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Ruta } from '../models/ruta';
import { environment } from '../../environments/environment';

const base_url=environment.base;


@Injectable({
  providedIn: 'root'
})
export class RutaService {
private url = `${base_url}/rutas`;
  private listaCambio = new Subject<Ruta[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Ruta[]>(this.url);
  }

  insert(r: Ruta) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Ruta[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Ruta>(`${this.url}/${id}`)
  }
  update(r:Ruta){
    return this.http.put(this.url , r)
  }
  deleteU(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
