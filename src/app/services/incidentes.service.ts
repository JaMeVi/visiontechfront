import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Incidente } from '../models/incidente';
import { Observable, Subject, tap } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class IncidentesService {

private url = `${base_url}/rutas`;
private listaCambio = new Subject<Incidente[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Incidente[]>(this.url);
  }

  insert(r: Incidente) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Incidente[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Incidente>(`${this.url}/${id}`)
  }
  update(i:Incidente){
    return this.http.put(this.url , i)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }



  }
