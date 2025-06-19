import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/roles';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private listaCambio = new Subject<Roles[]>();
  private url=`${base_url}/roles`
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Roles[]>(this.url);
  }

  getList() { // para actualizar automático (looks like)
    return this.listaCambio.asObservable();
  }

    deleteA(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }

    setList(listaNueva: Roles[]) {
    this.listaCambio.next(listaNueva);
  }


}
