import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Roles } from '../models/roles';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolesService {
private url = `${base_url}/roles`;
  private listaCambio = new Subject<Roles[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Roles[]>(this.url);
  }

  insert(r: Roles) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Roles[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Roles>(`${this.url}/${id}`)
  }
  update(r:Roles){
    return this.http.put(this.url , r)
  }
  deleteU(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
