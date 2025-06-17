import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CondicionAtmosferica } from '../models/condicionatmosferica';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CondicionatmosfericaService {
private url = `${base_url}/catmosferica`;
private listaCambio = new Subject<CondicionAtmosferica[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<CondicionAtmosferica[]>(this.url);
  }

  insert(ca: CondicionAtmosferica) {
    return this.http.post(this.url, ca);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:CondicionAtmosferica[]){
    this.listaCambio .next(listaNueva);

  }

  listId(id:number){
    return this.http.get<CondicionAtmosferica>(`${this.url}/${id}`)
  }
  update(ca:CondicionAtmosferica){
    return this.http.put(this.url , ca)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
