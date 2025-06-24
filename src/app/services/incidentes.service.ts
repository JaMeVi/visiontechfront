import { Subject } from 'rxjs';
import { Incidente } from './../models/incidentes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {

  private listaCambio = new Subject<Incidente[]>();
    private url=`${base_url}/incidentes`
    constructor(private http:HttpClient) { }
  
    list() {
      return this.http.get<Incidente[]>(this.url);
    }
  
    getList() { // para actualizar automático (looks like)
      return this.listaCambio.asObservable();
    }
  
      deleteA(id: number){
      return this.http.delete(`${this.url}/${id}`)
    }
  
      setList(listaNueva: Incidente[]) {
      this.listaCambio.next(listaNueva);
    }
  
  
  }
  